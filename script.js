function getRepos(user) {
    const searchURL = `https://api.github.com/users/${user}/repos`
    console.log(searchURL);
    fetch(searchURL)
    .then(response => {
      if (response.length != 0) {
        return response.json();
      }
      throw new Error(response.message);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').html(`<p>ERROR: ${err.message}</p><p>The user <strong>${user}</strong> does not exist, or has no repos.</p>`);
      $('#js-error-message').removeClass('hidden');
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#js-results-display').empty();
    $('#js-user-display').empty();
    $('#js-error-message').text('');
    $('#js-error-message').addClass('hidden');
    for (let i = 0; i < responseJson.length; i++){
      $('#js-results-display').append(
        `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        </li>`
      )};
      $('#js-user-display').html(`${responseJson[0].owner.login}'s repos:`);
    $('#js-results-display').removeClass('hidden');
    $('.results').removeClass('hidden');
  };

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-user').val();
        console.log(searchTerm);
        getRepos(searchTerm);
      });
}

$(watchForm);