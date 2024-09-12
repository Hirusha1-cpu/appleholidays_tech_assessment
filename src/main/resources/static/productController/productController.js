window.addEventListener('load', () => {
    refreshProductTable();
    refreshProductForm();
    updateDateTime(); // Set initial date and time
    setInterval(updateDateTime, 1000); // Update every second
})

const refreshProductTable = () => {
    products = ajaxGetRequest('/product/getlist')
    console.log(products);

    const displayProperties = [
        { property: getProductCode, dataType: 'function' },
        { property: getProductName, dataType: 'function' },
        { property: getProductCategory, dataType: 'function' },
        { property: getProductBrand, dataType: 'function' },
        { property: getProductPrice, dataType: 'function' },
        { property: getProductSupplierName, dataType: 'function' },
    ]
    fillDataIntoTable(empTab, products, displayProperties, editEmployeeBtn, deleteEmployeeBtn, true)

}
const editEmployeeBtn = (item) => {
    document.getElementById('btnUpdate').disabled = false
    document.getElementById('btnAdd').disabled = true
    console.log("edit");
    console.log(item);
    product = JSON.parse(JSON.stringify(item));
    oldproduct = JSON.parse(JSON.stringify(item));

    inputProductCode.value = product.productcode
    inputProductName.value = product.productname
    // selectCategory.value = product.category
    // selectBrand.value = product.brand
    inputPrice.value = product.price
    inputSupplierName.value = product.suppliername

    fillDataIntoSelect(selectCategory, "Select Category", categoryList, 'category', product.category_id.category)
    fillDataIntoSelect(selectBrand, "Select Brand", brandList, 'brand', product.brand_id.brand)


    const table = document.getElementById("empTable");
    const form = document.getElementById("empForm");

    // Animate table disappearance
    table.style.opacity = 1; // Ensure opacity is initially 1
    table.style.transition = "opacity 1.5s ease-out";
    table.style.display = "none"; // Trigger the animation

    // Delay form appearance slightly
    setTimeout(function () {
        form.style.opacity = 0;
        form.style.display = "block";
        form.style.transition = "opacity 1.5s ease-in";
        form.style.opacity = 1; // Gradually fade in
    }, 100); // Adjust the delay as needed
}

const deleteEmployeeBtn = (rowOb) => {
    console.log("delete");

    setTimeout(function () {
        // Use SweetAlert2 for confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete " + rowOb.productname + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // If the user confirms, proceed with the delete action
                let serverResponse = ajaxRequestBodyMethod("/product", "DELETE", rowOb);
                if (serverResponse == "OK") {
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted successfully.',
                        'success'
                    );
                    refreshProductTable(); // Refresh the table after deletion
                } else {
                    Swal.fire(
                        'Error!',
                        'Delete not successful: ' + serverResponse,
                        'error'
                    );
                }
            }
        });
    }, 500);
};


const getProductCode = (rowObject) => {
    console.log(rowObject);

    return rowObject?.productcode
}
const getProductName = (rowObject) => {
    return rowObject?.productname
}
const getProductCategory = (rowObject) => {
    return rowObject?.category_id?.category
}
const getProductBrand = (rowObject) => {
    return rowObject?.brand_id?.brand
}
const getProductPrice = (rowObject) => {
    return rowObject?.price
}
const getProductSupplierName = (rowObject) => {
    return rowObject?.suppliername
}

function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const currentDateTime = now.toLocaleDateString('en-GB', options)
    document.getElementById('date').innerHTML = currentDateTime;
}

const refreshProductForm = () => {
    product = {};
    categoryList = ajaxGetRequest("/category/getlist")
    brandList = ajaxGetRequest("/brand/getlist")
    fillDataIntoSelect(selectCategory, "Select Category", categoryList, 'category')
    fillDataIntoSelect(selectBrand, "Select Brand", brandList, 'brand')
    btnUpdate.disabled = true
}

const checkError = () => {
    let errors = '';
    console.log(product);
    // if (inputFullName1.value == "") 
    if (product.productcode == null) {
        errors = errors + "Please enter a productcode";
        // inputFullName1.style.border = '2px solid red';
        inputProductCode.classList.add("is-invalid");
    } else {
        inputProductCode.classList.remove("is-invalid");
        inputProductCode.classList.add("is-valid");
    }
    if (product.productname == null) {
        errors = errors + "Please enter a productname";
        // inputFullName1.style.border = '2px solid red';
        inputProductName.classList.add("is-invalid");
    }
    if (product.category_id.category == null) {
        errors = errors + "Please enter a category";
        // inputFullName1.style.border = '2px solid red';
        selectCategory.classList.add("is-invalid");
    }
    if (product.brand_id.brand == null) {
        errors = errors + "Please enter a brand";
        // inputFullName1.style.border = '2px solid red';
        selectBrand.classList.add("is-invalid");
    }
    if (product.price == null) {
        errors = errors + "Please enter a price";
        // inputFullName1.style.border = '2px solid red';
        inputPrice.classList.add("is-invalid");
    }
    if (product.suppliername == null) {
        errors = errors + "Please enter a suppliername";
        // inputFullName1.style.border = '2px solid red';
        inputSupplierName.classList.add("is-invalid");
    }

    return errors;
}



const checkUpdate = () => {
    let updates = "";
    if (product.productcode != oldproduct.productcode) {
        updates += "Product code is changed.";
    }
    if (product.productname != oldproduct.productname) {
        updates += "\n Product name is changed.";
    }
    if (product.category_id.category != oldproduct.category_id.category) {
        updates += "\n Category is changed.";
    }
    if (product.brand_id.brand != oldproduct.brand_id.brand) {
        updates += "\n Brand is changed.";
    }
    if (product.price != oldproduct.price) {
        updates += "\n Price is changed.";
    }
    if (product.suppliername != oldproduct.suppliername) {
        updates += "\n Supplier name is changed.";
    }
    return updates;
}

const addedProductDetails = (productcode, productname, price, suppliername, category, brand) => {
    const emplyoeeDetails1 = `<b>
    Productcode: ${productcode} \n
    Productname: ${productname} \n
    Price: ${price} \n
    Product suppliername: ${suppliername} \n
    Product category: ${category} \n
    Product brand: ${brand} \n
    <b>`;

    Swal.fire({
        title: "Do you want to save?",
        html: emplyoeeDetails1,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        customClass: {
            title: 'custom-title', // Apply custom CSS class to title
            html: 'custom-html', // Apply custom CSS class to HTML container
        },
    }).then((result) => {
        if (result.isConfirmed) {
            let serverResponse = ajaxRequestBodyMethod("/product", "POST", product);
            console.log(serverResponse);
            if (serverResponse === "OK") {
                // alert("Save successfully...!" + serverResponse)
                Swal.fire("Saved!", "", "success");
                saveDetails(serverResponse);
            } else {
                Swal.fire("Not saved" + serverResponse, "", "info");
                // alert("Save not successfully...!" + serverResponse)

            }

        } else if (result.isDenied) {
            Swal.fire("Not saved", "", "info");
        }
    });
}
const saveDetails = (updateServiceResponse) => {
    if (updateServiceResponse == "OK") {
        // alert("Update successfully...!")
        productDelete()
        refreshProductTable();
        //need hide modal
        const table = document.getElementById("empTable");
        const form = document.getElementById("empForm");

        // Animate table disappearance
        form.style.opacity = 1; // Ensure opacity is initially 1
        form.style.transition = "opacity 1.5s ease-out";
        form.style.display = "none"; // Trigger the animation

        // Delay form appearance slightly
        setTimeout(function () {
            table.style.opacity = 0;
            table.style.display = "block";
            table.style.transition = "opacity 1.5s ease-in";
            table.style.opacity = 1; // Gradually fade in
        }, 100); // Adjust the delay as needed

    } else {
        alert("Update not succefully  .." + updateServiceResponse)
    }
}

const productAdd = () => {

    let error = checkError();
    if (error == "") {

        addedProductDetails(product.productcode, product.productname, product.price, product.suppliername, product.category_id.category, product.brand_id.brand)
        // let serverProductResponse = ajaxRequestBodyMethod("/product", "POST", product)
        // console.log(serverProductResponse);
        // if (serverProductResponse == "OK") {
        //     alert("Added successfully...!")
        //     refreshProductForm();
        //     formEmployee.reset()
        //     refreshProductTable();

        //     const table = document.getElementById("empTable");
        //     const form = document.getElementById("empForm");

        //     // Animate table disappearance
        //     form.style.opacity = 1; // Ensure opacity is initially 1
        //     form.style.transition = "opacity 1.5s ease-out";
        //     form.style.display = "none"; // Trigger the animation

        //     // Delay form appearance slightly
        //     setTimeout(function () {
        //         table.style.opacity = 0;
        //         table.style.display = "block";
        //         table.style.transition = "opacity 1.5s ease-in";
        //         table.style.opacity = 1; // Gradually fade in
        //     }, 100); // Adjust the delay as needed
        // }
    } else {
        alert("Form has following errors \n" + error)
    }

}


const productUpdate = () => {
    console.log("update");

    // Check for errors
    let error = checkError();
    if (error == "") {
        // Check if there are updates
        let updates = checkUpdate();
        if (updates != "") {
            // Use SweetAlert for confirmation
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure you want to update the following changes?\n" + updates,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Call PUT service
                    let updateServiceResponse = ajaxRequestBodyMethod("/product", "PUT", product);
                    
                    // Check backend response
                    if (updateServiceResponse == "OK") {
                        Swal.fire(
                            'Updated!',
                            'Product updated successfully!',
                            'success'
                        );
                        productDelete();
                        refreshProductTable();

                        // Animate form disappearance and table appearance
                        const table = document.getElementById("empTable");
                        const form = document.getElementById("empForm");

                        // Animate form fade out
                        form.style.opacity = 1; 
                        form.style.transition = "opacity 1.5s ease-out";
                        form.style.display = "none"; 

                        // Delay table fade-in slightly
                        setTimeout(function () {
                            table.style.opacity = 0;
                            table.style.display = "block";
                            table.style.transition = "opacity 1.5s ease-in";
                            table.style.opacity = 1; 
                        }, 100); 

                    } else {
                        // SweetAlert for error response
                        Swal.fire(
                            'Error!',
                            'Update failed: ' + updateServiceResponse,
                            'error'
                        );
                    }
                }
            });
        } else {
            // SweetAlert for no changes
            Swal.fire(
                'No Changes',
                'The form has no changes to update.',
                'info'
            );
        }
    } else {
        // SweetAlert for form errors
        Swal.fire(
            'Error!',
            'The form contains the following errors:\n' + error,
            'error'
        );
    }
}

const productDelete = () => {
    document.getElementById('formEmployee').reset();

    refreshProductForm()
    const fields = ['inputProductCode', 'inputProductName', 'inputPrice', 'inputSupplierName', 'selectCategory', 'selectBrand'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.style.borderColor = 'white';  // Set border color to white
    });
    document.getElementById('btnUpdate').disabled = true
    document.getElementById('btnAdd').disabled = false

 
}