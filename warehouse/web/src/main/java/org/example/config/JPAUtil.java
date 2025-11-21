package org.example.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.io.InputStream;
import java.util.Properties;

public class JPAUtil {

    private static  EntityManagerFactory emf;

    static {
        try {
            Properties props = new Properties();
            try (InputStream in = JPAUtil.class.getClassLoader()
                    .getResourceAsStream("database.properties")) {
                props.load(in);
            }

            Properties jpaProps = new Properties();
            jpaProps.put("jakarta.persistence.jdbc.url", props.getProperty("db.url"));
            jpaProps.put("jakarta.persistence.jdbc.user", props.getProperty("db.user"));
            jpaProps.put("jakarta.persistence.jdbc.password", props.getProperty("db.password"));
            jpaProps.put("jakarta.persistence.jdbc.driver", props.getProperty("db.driver"));

            emf = Persistence.createEntityManagerFactory("warehousePU", jpaProps);
        } catch (Exception e) {
            throw new RuntimeException("Failed to init JPA EMF", e);
        }
    }


    public static EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
}
