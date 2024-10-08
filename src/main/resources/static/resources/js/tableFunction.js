//create function for fill data intop table

const fillDataIntoTable = (tableId, dataList, propertyList, editButtonFunction, deleteButtonFunction,
    buttonVisibility = true, privilegeOb = null,selectPurchaseIndex = null) => {
    //create variable for store body
    const tableBody = tableId.children[1];
    tableBody.innerHTML = '';

    dataList.forEach((item, index) => {
        // console.log('Element: ' + index + '=>' + item);
        const tr = document.createElement('tr');
        tr.innerHTML = '';
        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const itemOb of propertyList) {
            const td = document.createElement('td');
            //  td.innerText = item.number;
            if (itemOb.dataType == 'string') {
                if (dataList[index][itemOb.property] == null) {
                    td.innerText = "-"
                } else {
                    td.innerHTML = dataList[index][itemOb.property]

                }
            }
            if (itemOb.dataType == 'function') {
                td.innerHTML = itemOb.property(dataList[index]);
            }
            if (itemOb.dataType == 'photoarray') {
                let img = document.createElement('img');
                img.style.width = "75px"
                img.style.height = "75px"
                if (dataList[index][itemOb.property] == null) {
                    img.src = "resourcesT/assets/jeewa-high-resolution-logo-white-transparent.png"
                }else{
                    img.src =atob(dataList[index][itemOb.property])

                }
                td.appendChild(img);
            }
            if (itemOb.dataType == 'boolean') {
                td.innerHTML = dataList[index][itemOb.property]
                if (td.innerHTML == 'true') {
                    td.innerHTML = 'grant'
                } else {
                    td.innerHTML = 'not-grant'
                }
            }
            tr.appendChild(td);
        }

        if (selectPurchaseIndex) {
            const tdDropdown = document.createElement('td');
            tdDropdown.appendChild(selectPurchaseIndex);
            tr.appendChild(tdDropdown);
        }


        const tdButton = document.createElement('td')

        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn btn-outline-warning'
        btnEdit.innerHTML = 'Edit'
        btnEdit.onclick = () => {
            console.log('edit', item.id, index);
            editButtonFunction(item, index)
        }

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn-outline-danger ms-1 me-1'
        btnDelete.innerHTML = 'Delete'
        btnDelete.onclick = (index) => {
            // console.log('delete',item.id);
            // deleteEmp(index);
            deleteButtonFunction(item, index);
        }

        // const deleteEmp = (rowindex) => {
        //     const userConfirm = confirm('Are you sure you want to delete' + employees[rowindex].fullname);
        //     if (userConfirm) {
        //         alert('Employee delete succefully');
        //         // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

        //         refreshEmployeeTable()

        //     } else {

        //     }

        // }

        // const buttonPrint = document.createElement('button');
        // buttonPrint.className = 'btn btn-outline-warning';
        // buttonPrint.innerHTML = '<i class="fa-solid fa-print "></i>';
        // buttonPrint.onclick = (index) => {
        //     console.log('print', item.id);
        //     printButtonFunction(item, index);

        // }
        // if (buttonVisibility) {

        //     if (privilegeOb != null && privilegeOb.update) {
        //         tdButton.appendChild(btnEdit);
        //     }
        //     if (privilegeOb != null && privilegeOb.delete) {
        //         tdButton.appendChild(btnDelete);
        //     }

        //     tdButton.appendChild(buttonPrint);
        //     tr.appendChild(tdButton);

        // }
        if (buttonVisibility) {

          
            tdButton.appendChild(btnEdit);
            
            tdButton.appendChild(btnDelete);

            tr.appendChild(tdButton);

        }
        tableBody.appendChild(tr);
    })

}

