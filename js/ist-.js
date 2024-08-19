
  document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.properties-filter a');
    const propertiesItems = document.querySelectorAll('.properties-items');
    const showAllButton = document.querySelector('[data-filter="*"]');
    
    // Function to hide all items and show specific number based on filter
    function updateItems(filter, count = Infinity) {
      propertiesItems.forEach(item => {
        item.classList.remove('show');
        item.style.display = 'none';
      });

      if (filter === '*') {
        propertiesItems.forEach((item, index) => {
          if (index < count) {
            item.classList.add('show');
            item.style.display = 'block';
          }
        });
      } else {
        let filteredItems = Array.from(propertiesItems).filter(item => item.classList.contains(filter.slice(1)));
        filteredItems.forEach((item, index) => {
          if (index < count) {
            item.classList.add('show');
            item.style.display = 'block';
          }
        });
      }
    }
    
    // Event listeners for filter links
    filterLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        filterLinks.forEach(l => l.classList.remove('is_active'));
        link.classList.add('is_active');

        const filter = link.getAttribute('data-filter');
        let count;
        switch (filter) {
          case '.adv':
            count = 4; // Number of items to show for Apartment
            break;
          case '.str':
            count = 6; // Number of items to show for Villa
            break;
          case '.rac':
            count = 6; // Number of items to show for Penthouse
            break;
          default:
            count = Infinity; // Show all items for "Show All"
        }
        updateItems(filter, count);
      });
    });

    // Event listener for "Show All" button
    showAllButton.addEventListener('click', (event) => {
      event.preventDefault();
      filterLinks.forEach(l => l.classList.remove('is_active'));
      showAllButton.classList.add('is_active');
      updateItems('*');
    });

    // Initial setup
    updateItems('*');
  });

  //Pagination 

  document.addEventListener('DOMContentLoaded', () => {
    const paginationLinks = document.querySelectorAll('.pagination a');
    const propertiesItems = document.querySelectorAll('.properties-items');
  
    let itemsPerPage = 4; // Default number of items per page
    let currentPage = 1;
  
    // Function to update items based on pagination
    function updateItems(page = 1) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
  
      propertiesItems.forEach(item => {
        item.classList.remove('show');
        item.style.display = 'none';
      });
  
      propertiesItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
          item.classList.add('show');
          item.style.display = 'block';
        }
      });
    }
  
    // Event listener for pagination links
    paginationLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        paginationLinks.forEach(l => l.classList.remove('is_active'));
        link.classList.add('is_active');
  
        let page = link.getAttribute('data-page');
        if (page === 'next') {
          currentPage++;
        } else {
          currentPage = parseInt(page);
        }
        updateItems(currentPage);
      });
    });
  
    // Initial setup
    updateItems(currentPage);
  });
  