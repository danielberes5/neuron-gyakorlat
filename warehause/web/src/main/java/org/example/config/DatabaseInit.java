package org.example.config;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.Statement;

@WebListener
public class DatabaseInit implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("HSQLDB init started...");

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement()) {

            String sql = Files.readString(Paths.get(
                    getClass().getClassLoader().getResource("init.sql").toURI()
            ));

            for (String s : sql.split(";")) {
                String query = s.trim();
                if (!query.isEmpty()) {
                    stmt.execute(query);
                }
            }

            System.out.println("Database initialized successfully!");

        } catch (Exception e) {
            System.err.println("Error in database initialization!");
            e.printStackTrace();
        }
    }
}
