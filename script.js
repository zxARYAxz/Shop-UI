document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart counter
  let cartCount = 0;

  // Get all add buttons (+ buttons on food cards)
  const addButtons = document.querySelectorAll('.add-button, .button-2, .button-3');

  // Get the checkout button
  const checkoutButton = document.querySelector('.checkout-button, .button-8');

  // Get quantity controls in the order sidebar
  const increaseButtons = document.querySelectorAll('.increase, .button-5, .button-7');
  const decreaseButtons = document.querySelectorAll('.decrease, .button-4, .button-6');
  const quantityElements = document.querySelectorAll('.quantity, .div-74, .div-81');

  // Add event listeners to the add buttons
  addButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Increment cart counter
      cartCount++;

      // Get the food item details
      const foodCard = this.closest('.food-card, .div-37, .div-43');
      const foodTitle = foodCard.querySelector('.food-title, .div-40, .div-46').textContent;
      const foodPrice = foodCard.querySelector('.food-price, .div-42, .div-48').textContent;

      // Create and show notification
      showNotification(`Added ${foodTitle} to cart - ${foodPrice}`);

      // Update any cart indicators if they exist
      updateCartIndicators();
    });
  });

  // Add event listeners to increase buttons in order sidebar
  increaseButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Get current quantity
      let quantity = parseInt(quantityElements[index].textContent);
      // Increment quantity
      quantity++;
      // Update display with leading zero if needed
      quantityElements[index].textContent = quantity.toString().padStart(2, '0');
      // Update total price
      updateTotalPrice();
    });
  });

  // Add event listeners to decrease buttons in order sidebar
  decreaseButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Get current quantity
      let quantity = parseInt(quantityElements[index].textContent);
      // Decrement quantity but don't go below 1
      if (quantity > 1) {
        quantity--;
        // Update display with leading zero if needed
        quantityElements[index].textContent = quantity.toString().padStart(2, '0');
        // Update total price
        updateTotalPrice();
      }
    });
  });

  // Add event listener to checkout button
  if (checkoutButton) {
    checkoutButton.addEventListener('click', function() {
      // Get the total price
      const totalPrice = document.querySelector('.total-amount, .div-84').textContent;

      // Show success message
      showSuccessMessage(`Your order for ${totalPrice} has been placed successfully!`);

      // Reset quantities to 1
      quantityElements.forEach(element => {
        element.textContent = '01';
      });

      // Reset cart counter
      cartCount = 0;
      updateCartIndicators();
    });
  }

  // Function to update the total price based on quantities and prices
  function updateTotalPrice() {
    // Get all order items
    const orderItems = document.querySelectorAll('.order-item, .div-68, .div-75');
    let total = 0;

    // Calculate total based on price and quantity
    orderItems.forEach((item, index) => {
      const priceText = item.querySelector('.order-item-price, .div-72, .div-79').textContent;
      const price = parseFloat(priceText.replace('$', ''));
      const quantity = parseInt(quantityElements[index].textContent);

      total += price * quantity;
    });

    // Update the total price display
    const totalAmount = document.querySelector('.total-amount, .div-84');
    if (totalAmount) {
      totalAmount.textContent = `$${total.toFixed(2)}`;
    }
  }

  // Function to update any cart indicators
  function updateCartIndicators() {
    // This is a placeholder function
    // You could add a cart counter display here if needed
    console.log(`Cart now contains ${cartCount} items`);
  }

  // Function to show a notification when an item is added
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#ff9921',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: '1000',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });

    // Add to document
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);

    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Function to show success message after checkout
  function showSuccessMessage(message) {
    // Create success message overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';

    // Style the overlay
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '2000'
    });

    // Create message container
    const messageBox = document.createElement('div');
    messageBox.className = 'success-message';

    // Style the message box
    Object.assign(messageBox.style, {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      textAlign: 'center',
      maxWidth: '80%'
    });

    // Add message content
    const messageText = document.createElement('h2');
    messageText.textContent = message;
    messageText.style.color = '#2f2f2f';
    messageText.style.marginBottom = '20px';

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';

    // Style the button
    Object.assign(closeButton.style, {
      backgroundColor: '#ff9921',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    });

    // Add event listener to close button
    closeButton.addEventListener('click', function() {
      document.body.removeChild(overlay);
    });

    // Assemble and add to document
    messageBox.appendChild(messageText);
    messageBox.appendChild(closeButton);
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
  }

  // Initial calculation of total price
  updateTotalPrice();
});
