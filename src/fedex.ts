import axios from 'axios';
import {
    TAuthenticateResponse,
    TFedExConstructor,
    TRetrieveRatePayload,
    TRetrieveRateResponse,
    TShipmentRequest,
} from './types';

class FedExApi {
    base_url: string;
    client_id: string;
    client_secret: string;
    token: {
        token_type: string | null;
        access_token: string | null;
        expires_at: number;
    };

    constructor({ client_id, client_secret, is_sandbox = false }: TFedExConstructor) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.base_url = is_sandbox ? 'https://apis-sandbox.fedex.com' : 'https://apis.fedex.com';
        this.token = {
            token_type: null,
            access_token: null,
            expires_at: 0,
        };
    }

    async authenticate() {
        const payload = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: 'client_credentials',
        };
        const urlEncodedPayload = new URLSearchParams(Object.entries(payload)).toString();
        try {
            const { data } = await axios.post<TAuthenticateResponse>(
                `${this.base_url}/oauth/token`,
                urlEncodedPayload,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            this.token = {
                token_type: data.token_type,
                access_token: data.access_token,
                expires_at: Date.now() + data.expires_in * 1000,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async retrieveRate(
        payload: TRetrieveRatePayload,
        transaction_id: string
    ): Promise<TRetrieveRateResponse> {
        if (this.token.access_token && this.token.expires_at > Date.now() - 10000) {
            const { data } = await axios.post(`${this.base_url}/rate/v1/rates/quotes`, payload, {
                headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                    'Content-Type': 'application/json',
                    'x-customer-transaction-id': transaction_id,
                },
            });
            return data;
        } else {
            await this.authenticate();
            return this.retrieveRate(payload, transaction_id);
        }
    }

    async createShipment(payload: TShipmentRequest): Promise<any> {
        if (this.token.access_token && this.token.expires_at > Date.now() - 1000) {
            const { data } = await axios.post(`${this.base_url}/ship/v1/shipments`, payload, {
                headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            return data;
        } else {
            await this.authenticate();
            return this.createShipment(payload);
        }
    }
}

export default FedExApi;
