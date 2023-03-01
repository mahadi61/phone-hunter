const loadPhones = async(searchText, dataLimit) =>{

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';


    // display 10phone only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    }
    

    // display no phone
    const noPhone = document.getElementById('warning-text-area');
    if(phones.length === 0){
      noPhone.classList.remove('d-none');
    
    }
    else{
      noPhone.classList.add('d-none');
    }


    // display phone
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');

        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
           
              </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}


const processSearch = (dataLimit) =>{
    // start loader
    toggleSpinner(true)

    const searchField = document.getElementById('inputText');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}


// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(10);

} )

// handle search input field enter kye
document.getElementById('inputText').addEventListener("keyup", function(event){
    if (event.key === 'Enter') {
        document.getElementById("btn-search").click();
    }
});


const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}



// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){

  processSearch();

})

const loadPhoneDetails = async(id) =>{
const url = `https://openapi.programming-hero.com/api/phone/${id}`
const res = await fetch(url);
const data = await res.json();
displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) =>{
console.log(phone);
const phoneNameTitle = document.getElementById('phoneDetailsModalLabel');
phoneNameTitle.innerText = `${phone.name}`;

const modalBody = document.getElementById('modal-body-content');
modalBody.innerHTML = `
<img src="${phone.image}" alt="">
<h5>Brand:${phone.brand}</h5>
<p>Release Date:${phone.releaseDate}</p>


`

}




// loadPhones();