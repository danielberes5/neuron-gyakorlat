package org.example.api.util;

import java.util.Set;

public class LogMaskingUtil {

    private static final Set<String> SENSITIVE_FIELDS = Set.of(
            "password",
            "token",
            "accessToken",
            "refreshToken"
    );

    public static String mask(String field, Object value) {

        if (value == null) {
            return "null";
        }

        if (SENSITIVE_FIELDS.contains(field)) {
            return "****";
        }

        if (field.toLowerCase().contains("email")) {
            String email = value.toString();
            int index = email.indexOf("@");
            if (index > 1) {
                return email.charAt(0) + "***" + email.substring(index);
            }
        }

        return value.toString();
    }
}