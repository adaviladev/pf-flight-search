const fetchFlightInfo = async (flightNumber) => {
    const url = `https://flight-radar1.p.rapidapi.com/flights/get-more-info?query=${flightNumber}&fetchBy=flight&page=1&limit=100`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '5f7b017e8amshff556b2d2908cd3p12dad9jsneb7d0c421d59',
        'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching flight info:', error);
      return { error: error.message };
    }
  };
  
  const fetchFlight = async () => {
    const flightNumberInput = document.getElementById('flightNumber').value.trim();
    if (!flightNumberInput) {
      alert('Por favor ingrese un número de vuelo');
      return;
    }
  
    const flightInfoDiv = document.getElementById('flightInfo');
    flightInfoDiv.textContent = 'Cargando información del vuelo...';
  
    try {
      const flightData = await fetchFlightInfo(flightNumberInput);
      flightInfoDiv.innerHTML = ''; // Limpiar contenido anterior
  
      if (flightData.error) {
        flightInfoDiv.textContent = `Error: ${flightData.error}`;
      } else {
        const flights = flightData.result.response.data;
        flights.forEach((flight, index) => {
          const flightDetails = `
            <div class="flight-details container mx-auto">
              <h3>Vuelo ${flight.identification.number.default}</h3>
              <p><strong>Aerolínea:</strong> ${flight.airline.name}</p>
              <p><strong>Estado:</strong> ${flight.status.text}</p>
              <p><strong>Origen:</strong> ${flight.airport.origin.name} (${flight.airport.origin.code.iata})</p>
              <p><strong>Destino:</strong> ${flight.airport.destination.name} (${flight.airport.destination.code.iata})</p>
              <p><strong>Programado:</strong> ${new Date(flight.time.scheduled.departure * 1000).toLocaleString()}</p>
            </div>
          `;
          flightInfoDiv.innerHTML += flightDetails;
        });
      }
    } catch (error) {
      console.error('Error fetching flight info:', error);
      flightInfoDiv.textContent = `Error: ${error.message}`;
    }
  };
  
  // Event listener para el botón o método de entrada para obtener el número de vuelo
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', fetchFlight);
  