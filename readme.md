# Product Management CRUD Application
## Overview
This is a Product Management CRUD (Create, Read, Update, Delete) application built using Spring Boot, Thymeleaf, and MySQL. The application allows users to add, edit, delete, and view products. Each product has a unique code, name, category, brand, supplier name, and price.
#
* #### Adding a new product.
* #### Displaying all products in a table.
* #### Editing product details with pre-filled forms.
* #### Deleting products with a confirmation prompt using SweetAlert.
#
This application serves as a simple and interactive way to manage product information in a database. The user interface is developed using Thymeleaf templates and is designed to be user-friendly.
#
## Features

#### 1. Add Product
##### Users can add a product by filling in the following fields:
* Product Code
* Product Name
* Category (selected from a dropdown list)
* Brand (selected from a dropdown list)
* Supplier Name
* Price
After adding, the product is displayed in a table.

#### 2. Edit Product
* The user can click the "Edit" button next to a product to modify its details.
* The form will be pre-filled with the current product details, and the "Update" button will be enabled.
* Upon submitting the updated details, the product in the table is updated.

#### 3. Delete Product
* The user can delete a product using the "Delete" button.
* A confirmation modal (SweetAlert) pops up to confirm the deletion.
* Upon confirmation, the product is removed from the table.

#### 4. View Products

All products are displayed in a responsive table format, showing key details such as:
* Product Code 
* Product Name
* Category
* Brand
* Supplier Name
* Price
The table includes options to edit or delete each product.

## Technologies Used
* IDE: Intellij 
* Backend: Spring Boot
* Frontend: Thymeleaf template engine
* Database: MySQL
* UI Alerts: SweetAlert for delete confirmation
* Server Port: 8081 (configured in application.properties)

## Setup and Configuration
### Prerequisites
* Java 8 or higher
* Maven
* MySQL
* MySQL Workbench
## Steps to Run the Application
1. *Clone the Repository:*
Please use Intellij IDE  

git clone https://github.com/Hirusha1-cpu/appleholidays_tech_assessment.git  
cd `<project-directory>`

2. *Configure MySQL Database:*

Open the src/main/resources/application.properties file and update the following properties to match your MySQL setup:  

spring.datasource.url=jdbc:mysql://localhost:3306/`<your-database-name> ` 

spring.datasource.username=`<your-username>`

spring.datasource.password=`<your-password>` 

spring.jpa.hibernate.ddl-auto=update  

spring.jpa.show-sql=true  

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect  

spring.application.name=demo  

server.port=8081

3. *Run the Application:*

Run the Spring Boot application using Maven:  
mvn spring-boot:run

5. *Access the Application:*
Open your web browser and go to: http://localhost:8081

## Database Setup
Make sure you have a MySQL database running. If you're using MySQL Workbench, create a new schema (database) and update the application.properties file with the database name, user, and password.  


To create the required schema, run in workbench:  
* CREATE DATABASE `<your-database-name>`;

## How to Use
1. *Add a Product:*
Navigate to the form, enter the required details, and click "Add". The new product will appear in the table below.  

2. *Edit a Product:*
Click on the "Edit" button in the table. The form will load with the product's current details, allowing you to make changes. Click "Update" to save changes.  

3. *Delete a Product:*
Click the "Delete" button. A confirmation SweetAlert popup will appear. Confirm the deletion, and the product will be removed from the table.


## Customization
You can modify the dropdowns for Category and Brand by updating the form fields in the Thymeleaf templates (src/main/resources/templates).

For database customization, simply alter the schema in your MySQL setup and ensure your application.properties points to the right database.

## Troubleshooting
Ensure your MySQL service is running before starting the application.  

Double-check your application.properties for accurate database credentials and port configurations.  

## Future Enhancements
Implement search and filter functionality for the product list.
Add pagination for better handling of large datasets.
Include validation for the form inputs to prevent invalid data submissions.