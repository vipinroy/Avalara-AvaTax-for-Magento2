define(
    [
        'jquery',
        'Magento_Checkout/js/model/quote'
    ],
    function (
        $,
        quote
    ) {
        'use strict';

        return function (address) {
            var newAddress = [];
            // The address being returned is meant to be stored on the quote in the database, not on the quote object
            // in the browser. The keys on the server side quote use snake case while the keys on the client side quote
            // use camel case. This loop converts the keys from snake case to camel case so the client side quote will
            // have the keys the server is expecting to see on the client side quote.
            $.each(address, function (key, value) {
                var newKey = key.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
                newAddress[newKey] = value;
            });

            var quoteShippingAddress = quote.shippingAddress();
            newAddress = $.extend(quoteShippingAddress, newAddress);
            quote.shippingAddress(newAddress);
            if ($('input[name=billing-address-same-as-shipping]').filter(':checked').length) {
                quote.billingAddress(newAddress);
            }
        };
    }
);
