package org.fundacionjala.contacts;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonSerializerHelper {

    public static String toJson(Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
