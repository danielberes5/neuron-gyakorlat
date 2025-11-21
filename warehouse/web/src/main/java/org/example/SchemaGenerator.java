package org.example;

import jakarta.persistence.Persistence;
import java.util.HashMap;
import java.util.Map;

public class SchemaGenerator {
    public static void main(String[] args) {
        String outputFile = args.length > 0 ? args[0] : "src/main/resources/schema.sql";

        Map<String, Object> properties = new HashMap<>();


        properties.put("jakarta.persistence.schema-generation.scripts.action", "create");
        properties.put("jakarta.persistence.schema-generation.scripts.create-target", outputFile);
        properties.put("jakarta.persistence.schema-generation.database.action", "none");

        Persistence.generateSchema("warehousePU", properties);

        System.out.println("DDL generated: " + outputFile);
    }
}
