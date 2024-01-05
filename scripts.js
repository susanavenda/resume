/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


 $(document).ready(function() {
  $.getJSON('labels.json', function(data) {
    try {
      Object.keys(data).forEach(function(key) {
        var element = $('#' + key);
        if (element.length > 0) {
          element.text(data[key]);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }).fail(function(jqxhr, textStatus, error) {
    console.error('Request Failed:', textStatus, error);
  });
});


function mapToItem(data) {
    if (data.jobTitle !== undefined) {
        return {
            title: data.jobTitle,
            subtitle: data.company,
            duration: data.duration,
            details: Array.isArray(data.responsibilities) ? data.responsibilities : [data.responsibilities]
        };
    } else if (data.degree !== undefined) {
        return {
            title: data.degree,
            subtitle: data.university,
            duration: data.duration,
            details: [] // Education might not have specific details in this context, you can add them if needed
        };
    } else {
        return {}; // Return an empty object for unknown data
    }
}

function createGenericElement(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("d-flex", "flex-column", "flex-md-row", "justify-content-between", "mb-5");
    itemElement.innerHTML = `
        <div class="flex-grow-1">
            <h3 class="mb-0">${item.title}</h3>
            <div class="subheading mb-3">${item.subtitle}</div>
            <ul>
                ${item.details.map(detail => `<li>${detail}</li>`).join("")}
            </ul>
        </div>
        <div class="flex-shrink-0"><span class="text-primary">${item.duration}</span></div>
    `;
    return itemElement;
}

function createObjectFromFile(file, elementId) {
    // Get the container to append job elements
    const jobsContainer = document.getElementById(elementId);

    // Fetch the JSON file
    fetch(file)
        .then(response => response.json())
        .then(items => {
            // Create item elements and append to the container
            items.forEach(item => {
                const itemElement = createGenericElement(mapToItem(item));
                jobsContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

   createObjectFromFile('jobs.json', 'jobsList') ;
 createObjectFromFile('education.json', 'educationList') ;
  

 
            

