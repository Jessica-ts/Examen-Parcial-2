function fetchCountry(query)
{
	let url = `https://restcountries.eu/rest/v2/name/${query}?fullText=true`
	$.ajax({
		url : url,
		method : "GET",
		dataType : "json",
		success : function(responseJSON)
		{
			displayResults(responseJSON);
		},
		error : function(error)
		{
			//console.log(error);
			displayError(error);
		}
	});
}

function displayResults(responseJSON)
{
	console.log(responseJSON);
	$(".js-search-results").empty();
	if(responseJSON)
	{
		for(let i=0; i<responseJSON.length; i++)
		{
			$(".js-search-results").append(`<div>
												<h3>${responseJSON[i].name}</h3>
												<p>Capital: ${responseJSON[i].capital}</p>
												<img class="dimension" src="${responseJSON[i].flag}" alt="bandera" />
												<p>Poblacion: ${responseJSON[i].population}</p>
												<p>Region: ${responseJSON[i].region}</p>
												<p>Zonas horarias: ${responseJSON[i].timezones} </p>
												<p>Paises con los que conlinda: ${responseJSON[i].borders}</p>
											</div>`);
		}
	}

}

function displayError(error)
{
	console.log(error);
	if(error)
	{
		$(".noResults").text("Pais no existente");
		$(".noResults").show();
	}
	
}

function init()
{
	$("#submitButton").on("click", (event)=>{
		event.preventDefault();
		
		let query = $("#query").val();
		fetchCountry(query);
		$("#query").val("");
	});
}
init();