export type TFedExConstructor = {
    client_id: string;
    client_secret: string;
    is_sandbox?: boolean;
};

export type TFedExClient = {
    base_url: string;
    client_id: string;
    client_secret: string;
    token: {
        token_type: string | null;
        access_token: string | null;
        expires_at: number;
    };

    authenticate: () => Promise<void>;
    retrieveRate: (
        payload: TRetrieveRatePayload,
        transaction_id: string
    ) => Promise<TRetrieveRateResponse>;
};

export type TAuthenticateResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
};

export type TRequest = 'ACCOUNT' | 'LIST';

export type TPackageLineItem = {
    weight: {
        units: 'LB' | 'KG';
        value: number;
    };
};

export type TPickup =
    | 'CONTACT_FEDEX_TO_SCHEDULE'
    | 'DROPOFF_AT_FEDEX_LOCATION'
    | 'USE_SCHEDULED_PICKUP';

export type EFedExPackages =
    | 'YOUR_PACKAGING'
    | 'FEDEX_ENVELOPE'
    | 'FEDEX_BOX'
    | 'FEDEX_SMALL_BOX'
    | 'FEDEX_MEDIUM_BOX'
    | 'FEDEX_LARGE_BOX'
    | 'FEDEX_EXTRA_LARGE_BOX'
    | 'FEDEX_10KG_BOX'
    | 'FEDEX_25KG_BOX'
    | 'FEDEX_PAK'
    | 'FEDEX_TUBE';

export type TFedExLabel =
    | 'PAPER_4X6'
    | 'PAPER_4X675'
    | 'PAPER_4X8'
    | 'PAPER_4X9'
    | 'PAPER_7X475'
    | 'PAPER_85X11_BOTTOM_HALF_LABEL'
    | 'PAPER_85X11_TOP_HALF_LABEL'
    | 'PAPER_LETTER'
    | 'STOCK_4X675_LEADING_DOC_TAB'
    | 'STOCK_4X8'
    | 'STOCK_4X9_LEADING_DOC_TAB'
    | 'STOCK_4X6'
    | 'STOCK_4X675_TRAILING_DOC_TAB'
    | 'STOCK_4X9_TRAILING_DOC_TAB'
    | 'STOCK_4X9'
    | 'STOCK_4X85_TRAILING_DOC_TAB'
    | 'STOCK_4X105_TRAILING_DOC_TAB';

export type TService =
    | 'FEDEX_INTERNATIONAL_PRIORITY_EXPRESS'
    | 'INTERNATIONAL_FIRST'
    | 'FEDEX_INTERNATIONAL_PRIORITY'
    | 'INTERNATIONAL_ECONOMY'
    | 'FEDEX_GROUND'
    | 'FEDEX_CARGO_MAIL'
    | 'FEDEX_CARGO_INTERNATIONAL_PREMIUM'
    | 'FIRST_OVERNIGHT'
    | 'FIRST_OVERNIGHT_FREIGHT'
    | 'FEDEX_1_DAY_FREIGHT'
    | 'FEDEX_2_DAY_FREIGHT'
    | 'FEDEX_3_DAY_FREIGHT'
    | 'INTERNATIONAL_PRIORITY_FREIGHT'
    | 'INTERNATIONAL_ECONOMY_FREIGHT'
    | 'FEDEX_CARGO_AIRPORT_TO_AIRPORT'
    | 'INTERNATIONAL_PRIORITY_DISTRIBUTION'
    | 'FEDEX_IP_DIRECT_DISTRIBUTION_FREIGHT'
    | 'INTL_GROUND_DISTRIBUTION'
    | 'GROUND_HOME_DELIVERY'
    | 'SMART_POST'
    | 'PRIORITY_OVERNIGHT'
    | 'STANDARD_OVERNIGHT'
    | 'FEDEX_2_DAY'
    | 'FEDEX_2_DAY_AM'
    | 'FEDEX_EXPRESS_SAVER'
    | 'SAME_DAY'
    | 'SAME_DAY_CITY';

export type TRetrieveRatePayload = {
    accountNumber: {
        value: string;
    };
    requestedShipment: {
        shipper: {
            address: {
                postalCode: number | string;
                countryCode: string;
            };
        };
        recipient: {
            address: {
                postalCode: 75063;
                countryCode: string;
            };
        };
        pickupType: TPickup;
        rateRequestType: TRequest[];
        requestedPackageLineItems: TPackageLineItem[];
    };
};

export type TRetrieveRateResponseAlert = {
    code: string;
    message: string;
    alertType: string;
};

export type TRetrieveRateResponseShipmentRateDetails = {
    rateZone: string;
    dimDivisor: number;
    fuelSurchargePercent: number;
    totalSurcharges: number;
    totalFreightDiscount: number;
    surCharges: {
        type: string;
        description: string;
        amount: number;
    }[];
    pricingCode: string;
    totalBillingWeight: {
        units: 'LB' | 'KG';
        value: number;
    };
    currency: string;
    rateScale: string;
};

export type TRatedPackage = {
    groupNumber: number;
    effectiveNetDiscount: number;
    packageRateDetail: {
        rateType: string;
        ratedWeightMethod: string;
        baseCharge: number;
        netFreight: number;
        totalSurcharges: number;
        netFedExCharge: number;
        totalTaxes: number;
        netCharge: number;
        totalRebates: number;
        billingWeight: {
            units: 'LB' | 'KG';
            value: number;
        };
        totalFreightDiscounts: number;
        surcharges: {
            type: string;
            description: string;
            amount: number;
        }[];
        currency: string;
    };
};

export type TRetrieveRateResponseRateReplyDetails = {
    serviceType: string;
    serviceName: string;
    packagingType: string;
    ratedShipmentDetails: [
        {
            rateType: 'ACCOUNT' | 'LIST';
            ratedWeightMethod: string;
            totalDiscounts: number;
            totalBaseCharge: number;
            totalNetCharge: number;
            totalNetFedExCharge: number;
            shipmentRateDetail: TRetrieveRateResponseShipmentRateDetails;
            ratedPackages: TRatedPackage[];
            currency: string;
        }
    ];
    operationalDetail: {
        ineligibleForMoneyBackGuarantee: false;
        astraDescription: string;
        airportId: string;
        serviceCode: string;
    };
    signatureOptionType: string;
    serviceDescription: {
        serviceId: string;
        serviceType: string;
        code: string;
        names: {
            type: string;
            encoding: 'utf-8';
            value: string;
        }[];
        serviceCategory: string;
        description: string;
        astraDescription: string;
    };
};

export type TRetrieveRateResponse = {
    transactionId: string;
    customerTransactionId: string;
    output: {
        alerts: TRetrieveRateResponseAlert[];
        rateReplyDetails: TRetrieveRateResponseRateReplyDetails[];
        quoteDate: string;
        encoded: boolean;
    };
};

export type TShipmentRequest = {
    labelResponseOptions: 'URL_ONLY' | 'LABEL';
    requestedShipment: {
        shipper: {
            contact: {
                personName?: string;
                phoneNumber: string | number;
                companyName?: string;
            };
            address: {
                streetLines: string[];
                city: string;
                stateOrProvinceCode?: string;
                postalCode: string;
                countryCode: string;
                residential?: boolean;
            };
        };
        recipients: {
            contact: {
                personName?: string;
                emailAddress?: string;
                phoneNumber: string | number;
                companyName?: string;
            };
            address: {
                streetLines: string[];
                city: string;
                stateOrProvinceCode?: string;
                postalCode: string;
                countryCode: string;
                residential?: boolean;
            };
        }[];
        shipDatestamp?: string;
        serviceType: TService;
        packagingType: EFedExPackages;
        pickupType: TPickup;
        blockInsightVisibility?: boolean;
        shippingChargesPayment: {
            paymentType: 'SENDER' | 'RECIPIENT' | 'THIRD_PARTY' | 'COLLECT';
        };
        labelSpecification: {
            imageType: 'ZPLII' | 'EPL2' | 'PDF' | 'PNG';
            labelStockType: TFedExLabel;
            labelRotation?: 'LEFT' | 'RIGHT' | 'UPSIDE_DOWN' | 'NONE';
        };
        requestedPackageLineItems: {
            groupPackageCount?: number;
            itemDescriptionForClearance?: string;
            declaredValue?: {
                amount: number;
                currency: string;
            };
            weight: {
                units: 'KG';
                value: number;
            };
        }[];
    };
    accountNumber: {
        value: string;
    };
};

export type TShipmentResponse = {
    transactionId: string;
    customerTransactionId: string;
    output: {
        transactionShipments: [
            {
                serviceType: 'STANDARD_OVERNIGHT';
                shipDatestamp: '2010-03-04';
                serviceCategory: 'EXPRESS';
                shipmentDocuments: [
                    {
                        contentKey: 'content key';
                        copiesToPrint: 10;
                        contentType: 'COMMERCIAL_INVOICE';
                        trackingNumber: '794953535000';
                        docType: 'PDF';
                        alerts: [
                            {
                                code: 'SHIP.RECIPIENT.POSTALCITY.MISMATCH';
                                alertType: 'NOTE';
                                message: 'Recipient Postal-City Mismatch.';
                            }
                        ];
                        encodedLabel: 'encoded label';
                        url: 'https://wwwdev.idev.fedex.com/document/v2/document/retrieve/SH,794810209259_SHIPPING_P/isLabel=true&autoPrint=false';
                    }
                ];
                pieceResponses: [
                    {
                        netChargeAmount: 21.45;
                        transactionDetails: [
                            {
                                transactionDetails: 'transactionDetails';
                                transactionId: '12345';
                            }
                        ];
                        packageDocuments: [
                            {
                                contentKey: 'content key';
                                copiesToPrint: 10;
                                contentType: 'COMMERCIAL_INVOICE';
                                trackingNumber: '794953535000';
                                docType: 'PDF';
                                alerts: [
                                    {
                                        code: 'SHIP.RECIPIENT.POSTALCITY.MISMATCH';
                                        alertType: 'NOTE';
                                        message: 'Recipient Postal-City Mismatch.';
                                    }
                                ];
                                encodedLabel: 'encoded label';
                                url: 'https://wwwdev.idev.fedex.com/document/v2/document/retrieve/SH,794810209259_SHIPPING_P/isLabel=true&autoPrint=false';
                            }
                        ];
                        acceptanceTrackingNumber: '794953535000';
                        serviceCategory: 'EXPRESS';
                        listCustomerTotalCharge: 'listCustomerTotalCharge';
                        deliveryTimestamp: '2012-09-23';
                        trackingIdType: 'FEDEX';
                        additionalChargesDiscount: 621.45;
                        netListRateAmount: 1.45;
                        baseRateAmount: 321.45;
                        packageSequenceNumber: 215;
                        netDiscountAmount: 121.45;
                        codcollectionAmount: 231.45;
                        masterTrackingNumber: '794953535000';
                        acceptanceType: 'acceptanceType';
                        trackingNumber: '794953535000';
                        successful: true;
                        customerReferences: [
                            {
                                customerReferenceType: 'INVOICE_NUMBER';
                                value: '3686';
                            }
                        ];
                    }
                ];
                serviceName: 'FedEx 2 Day Freight';
                alerts: [
                    {
                        code: 'SHIP.RECIPIENT.POSTALCITY.MISMATCH';
                        alertType: 'NOTE';
                        message: 'Recipient Postal-City Mismatch.';
                    }
                ];
                completedShipmentDetail: {
                    completedPackageDetails: [
                        {
                            sequenceNumber: 256;
                            operationalDetail: {
                                astraHandlingText: 'astraHandlingText';
                                barcodes: {
                                    binaryBarcodes: [
                                        {
                                            type: 'COMMON-2D';
                                            value: 'string';
                                        }
                                    ];
                                    stringBarcodes: [
                                        {
                                            type: 'ADDRESS';
                                            value: '1010062512241535917900794953544894';
                                        }
                                    ];
                                };
                                operationalInstructions: [
                                    {
                                        number: 17;
                                        content: 'content';
                                    }
                                ];
                            };
                            signatureOption: 'DIRECT';
                            trackingIds: [
                                {
                                    formId: '0201';
                                    trackingIdType: 'EXPRESS';
                                    uspsApplicationId: '92';
                                    trackingNumber: '49092000070120032835';
                                }
                            ];
                            groupNumber: 567;
                            oversizeClass: 'OVERSIZE_1, OVERSIZE_2, OVERSIZE_3';
                            packageRating: {
                                effectiveNetDiscount: 0;
                                actualRateType: 'PAYOR_ACCOUNT_PACKAGE';
                                packageRateDetails: [
                                    {
                                        ratedWeightMethod: 'DIM';
                                        totalFreightDiscounts: 44.55;
                                        totalTaxes: 3.45;
                                        minimumChargeType: 'CUSTOMER';
                                        baseCharge: 45.67;
                                        totalRebates: 4.56;
                                        rateType: 'PAYOR_RETAIL_PACKAGE';
                                        billingWeight: {
                                            units: 'KG';
                                            value: 68;
                                        };
                                        netFreight: 4.89;
                                        surcharges: [
                                            {
                                                amount: null;
                                                surchargeType: 'APPOINTMENT_DELIVERY';
                                                level: 'PACKAGE, or SHIPMENT';
                                                description: 'description';
                                            }
                                        ];
                                        totalSurcharges: 22.56;
                                        netFedExCharge: 12.56;
                                        netCharge: 121.56;
                                        currency: 'USD';
                                    }
                                ];
                            };
                            dryIceWeight: {
                                units: 'KG';
                                value: 68;
                            };
                            hazardousPackageDetail: {
                                regulation: 'IATA';
                                accessibility: 'ACCESSIBLE';
                                labelType: 'II_YELLOW';
                                containers: [
                                    {
                                        qvalue: 2;
                                        hazardousCommodities: [
                                            {
                                                quantity: {
                                                    quantityType: 'GROSS';
                                                    amount: 24.56;
                                                    units: 'Kg';
                                                };
                                                options: {
                                                    quantity: {
                                                        quantityType: 'GROSS';
                                                        amount: 24.56;
                                                        units: 'Kg';
                                                    };
                                                    innerReceptacles: [
                                                        {
                                                            quantity: {
                                                                quantityType: 'NET';
                                                                amount: 34.56;
                                                                units: 'Kg';
                                                            };
                                                        }
                                                    ];
                                                    options: {
                                                        labelTextOption: 'APPEND';
                                                        customerSuppliedLabelText: 'Customer Supplied Label Text.';
                                                    };
                                                    description: {
                                                        sequenceNumber: 9812;
                                                        processingOptions: [
                                                            'INCLUDE_SPECIAL_PROVISIONS'
                                                        ];
                                                        subsidiaryClasses: ['Subsidiary Classes'];
                                                        labelText: 'labelText';
                                                        technicalName: 'technicalName';
                                                        packingDetails: {
                                                            packingInstructions: 'packing Instructions';
                                                            cargoAircraftOnly: true;
                                                        };
                                                        authorization: 'authorization';
                                                        reportableQuantity: true;
                                                        percentage: 12.45;
                                                        id: '123';
                                                        packingGroup: 'I';
                                                        properShippingName: 'properShippingName';
                                                        hazardClass: 'hazard Class';
                                                    };
                                                };
                                                description: {
                                                    sequenceNumber: 876;
                                                    packingInstructions: 'packingInstructions';
                                                    subsidiaryClasses: ['Subsidiary Classes'];
                                                    labelText: 'labelText';
                                                    tunnelRestrictionCode: 'UN2919';
                                                    specialProvisions: 'specialProvisions';
                                                    properShippingNameAndDescription: 'properShippingNameAndDescription';
                                                    technicalName: 'technicalName';
                                                    symbols: 'symbols';
                                                    authorization: 'authorization';
                                                    attributes: ['attributes'];
                                                    id: '1234';
                                                    packingGroup: 'packingGroup';
                                                    properShippingName: 'properShippingName';
                                                    hazardClass: 'hazardClass';
                                                };
                                                netExplosiveDetail: {
                                                    amount: 10;
                                                    units: 'units';
                                                    type: 'NET_EXPLOSIVE_WEIGHT';
                                                };
                                                massPoints: 2;
                                            }
                                        ];
                                    }
                                ];
                                cargoAircraftOnly: true;
                                referenceId: '123456';
                                radioactiveTransportIndex: 2.45;
                            };
                        }
                    ];
                    operationalDetail: {
                        originServiceArea: 'A1';
                        serviceCode: '010';
                        airportId: 'DFW';
                        postalCode: '38010';
                        scac: 'scac';
                        deliveryDay: 'TUE';
                        originLocationId: '678';
                        countryCode: 'US';
                        astraDescription: 'SMART POST';
                        originLocationNumber: 243;
                        deliveryDate: '2001-04-05';
                        deliveryEligibilities: ['deliveryEligibilities'];
                        ineligibleForMoneyBackGuarantee: true;
                        maximumTransitTime: 'SEVEN_DAYS';
                        destinationLocationStateOrProvinceCode: 'GA';
                        astraPlannedServiceLevel: 'TUE - 15 OCT 10:30A';
                        destinationLocationId: 'DALA';
                        transitTime: 'TWO_DAYS';
                        stateOrProvinceCode: 'GA';
                        destinationLocationNumber: 876;
                        packagingCode: '03';
                        commitDate: '2019-10-15';
                        publishedDeliveryTime: '10:30A';
                        ursaSuffixCode: 'Ga';
                        ursaPrefixCode: 'XH';
                        destinationServiceArea: 'A1';
                        commitDay: 'TUE';
                        customTransitTime: 'ONE_DAY';
                    };
                    carrierCode: 'FDXE';
                    completedHoldAtLocationDetail: {
                        holdingLocationType: 'FEDEX_STAFFED';
                        holdingLocation: {
                            address: {
                                streetLines: ['10 FedEx Parkway', 'Suite 302'];
                                city: 'Beverly Hills';
                                stateOrProvinceCode: 'CA';
                                postalCode: '38127';
                                countryCode: 'US';
                                residential: false;
                            };
                            contact: {
                                personName: 'John Taylor';
                                tollFreePhoneNumber: '6127812';
                                emailAddress: 'sample@company.com';
                                phoneNumber: '1234567890';
                                phoneExtension: '91';
                                faxNumber: '1234567890';
                                pagerNumber: '6127812';
                                companyName: 'Fedex';
                                title: 'title';
                            };
                        };
                    };
                    completedEtdDetail: {
                        folderId: '0b0493e580dc1a1b';
                        type: 'COMMERCIAL_INVOICE';
                        uploadDocumentReferenceDetails: [
                            {
                                documentType: 'PRO_FORMA_INVOICE';
                                documentReference: 'DocumentReference';
                                description: 'PRO FORMA INVOICE';
                                documentId: '090927d680038c61';
                            }
                        ];
                    };
                    packagingDescription: 'description';
                    masterTrackingId: {
                        formId: '0201';
                        trackingIdType: 'EXPRESS';
                        uspsApplicationId: '92';
                        trackingNumber: '49092000070120032835';
                    };
                    serviceDescription: {
                        serviceType: 'FEDEX_1_DAY_FREIGHT';
                        code: '80';
                        names: [
                            {
                                type: 'long';
                                encoding: 'UTF-8';
                                value: 'F-2';
                            }
                        ];
                        operatingOrgCodes: ['FXE'];
                        astraDescription: '2 DAY FRT';
                        description: 'description';
                        serviceId: 'EP1000000027';
                        serviceCategory: 'freight';
                    };
                    usDomestic: true;
                    hazardousShipmentDetail: {
                        hazardousSummaryDetail: {
                            smallQuantityExceptionPackageCount: 10;
                        };
                        adrLicense: {
                            licenseOrPermitDetail: {
                                number: '12345';
                                effectiveDate: '2019-08-09';
                                expirationDate: '2019-04-09';
                            };
                        };
                        dryIceDetail: {
                            totalWeight: {
                                units: 'KG';
                                value: 68;
                            };
                            packageCount: 10;
                            processingOptions: {
                                options: ['options'];
                            };
                        };
                    };
                    shipmentRating: {
                        actualRateType: 'PAYOR_LIST_SHIPMENT';
                        shipmentRateDetails: [
                            {
                                rateZone: 'US001O';
                                ratedWeightMethod: 'ACTUAL';
                                totalDutiesTaxesAndFees: 24.56;
                                pricingCode: 'LTL_FREIGHT';
                                totalFreightDiscounts: 1.56;
                                totalTaxes: 3.45;
                                totalDutiesAndTaxes: 6.78;
                                totalAncillaryFeesAndTaxes: 5.67;
                                taxes: [
                                    {
                                        amount: 10;
                                        level: 'level';
                                        description: 'description';
                                        type: 'type';
                                    }
                                ];
                                totalRebates: 1.98;
                                fuelSurchargePercent: 4.56;
                                currencyExchangeRate: {
                                    rate: 25.6;
                                    fromCurrency: 'Rupee';
                                    intoCurrency: 'USD';
                                };
                                totalNetFreight: 9.56;
                                totalNetFedExCharge: 88.56;
                                shipmentLegRateDetails: [
                                    {
                                        rateZone: 'rateZone';
                                        pricingCode: 'pricingCode';
                                        taxes: [
                                            {
                                                amount: 10;
                                                level: 'level';
                                                description: 'description';
                                                type: 'type';
                                            }
                                        ];
                                        totalDimWeight: {
                                            units: 'KG';
                                            value: 68;
                                        };
                                        totalRebates: 2;
                                        fuelSurchargePercent: 6;
                                        currencyExchangeRate: {
                                            rate: 25.6;
                                            fromCurrency: 'Rupee';
                                            intoCurrency: 'USD';
                                        };
                                        dimDivisor: 6;
                                        rateType: 'PAYOR_RETAIL_PACKAGE';
                                        legDestinationLocationId: 'legDestinationLocationId';
                                        dimDivisorType: 'dimDivisorType';
                                        totalBaseCharge: 6;
                                        ratedWeightMethod: 'ratedWeightMethod';
                                        totalFreightDiscounts: 9;
                                        totalTaxes: 12.6;
                                        minimumChargeType: 'minimumChargeType';
                                        totalDutiesAndTaxes: 17.78;
                                        totalNetFreight: 6;
                                        totalNetFedExCharge: 3.2;
                                        surcharges: [
                                            {
                                                amount: null;
                                                surchargeType: 'APPOINTMENT_DELIVERY';
                                                level: 'PACKAGE, or SHIPMENT';
                                                description: 'description';
                                            }
                                        ];
                                        totalSurcharges: 5;
                                        totalBillingWeight: {
                                            units: 'KG';
                                            value: 68;
                                        };
                                        freightDiscounts: [
                                            {
                                                amount: 8.9;
                                                rateDiscountType: 'COUPON';
                                                percent: 28.9;
                                                description: 'description';
                                            }
                                        ];
                                        rateScale: '6702';
                                        totalNetCharge: 253;
                                        totalNetChargeWithDutiesAndTaxes: 25.67;
                                        currency: 'USD';
                                    }
                                ];
                                dimDivisor: 0;
                                rateType: 'RATED_ACCOUNT_SHIPMENT';
                                surcharges: [
                                    {
                                        amount: null;
                                        surchargeType: 'APPOINTMENT_DELIVERY';
                                        level: 'PACKAGE, or SHIPMENT';
                                        description: 'description';
                                    }
                                ];
                                totalSurcharges: 9.88;
                                totalBillingWeight: {
                                    units: 'KG';
                                    value: 68;
                                };
                                freightDiscounts: [
                                    {
                                        amount: 8.9;
                                        rateDiscountType: 'COUPON';
                                        percent: 28.9;
                                        description: 'description';
                                    }
                                ];
                                rateScale: '00000';
                                totalNetCharge: 3.78;
                                totalBaseCharge: 234.56;
                                totalNetChargeWithDutiesAndTaxes: 222.56;
                                currency: 'USD';
                            }
                        ];
                    };
                    documentRequirements: {
                        requiredDocuments: ['COMMERCIAL_OR_PRO_FORMA_INVOICE', 'AIR_WAYBILL'];
                        prohibitedDocuments: ['CERTIFICATE_OF_ORIGIN'];
                        generationDetails: [
                            {
                                type: 'COMMERCIAL_INVOICE';
                                minimumCopiesRequired: 3;
                                letterhead: 'OPTIONAL';
                                electronicSignature: 'OPTIONAL';
                            }
                        ];
                    };
                    exportComplianceStatement: '12345678901234567';
                    accessDetail: {
                        accessorDetails: [
                            {
                                password: 'password';
                                role: 'role';
                                emailLabelUrl: 'emailLabelUrl';
                                userId: 'userId';
                            }
                        ];
                    };
                };
                shipmentAdvisoryDetails: {
                    regulatoryAdvisory: {
                        prohibitions: [
                            {
                                derivedHarmonizedCode: '01';
                                advisory: {
                                    code: 'code';
                                    text: 'Text';
                                    parameters: [
                                        {
                                            id: 'message ID';
                                            value: 'Message value';
                                        }
                                    ];
                                    localizedText: 'localizedText';
                                };
                                commodityIndex: 12;
                                source: 'source';
                                categories: ['categories'];
                                type: 'type';
                                waiver: {
                                    advisories: [
                                        {
                                            code: 'code';
                                            text: 'Text';
                                            parameters: [
                                                {
                                                    id: 'message ID';
                                                    value: 'Message value';
                                                }
                                            ];
                                            localizedText: 'localizedText';
                                        }
                                    ];
                                    description: 'description';
                                    id: 'id';
                                };
                                status: 'status';
                            }
                        ];
                    };
                };
                masterTrackingNumber: '794953535000';
            }
        ];
        alerts: {
            code: string;
            alertType: string;
            message: string;
        }[];
        jobId: string;
    };
};
