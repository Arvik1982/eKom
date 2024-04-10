

export default async function getData(navigate:Function,inputSiteId:string){

interface MyApiData {
  message:string
}

const response = await fetch('https://track-api.leadhit.io/client/test_auth',
{
    method: "GET",
    headers: {
        "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
        "Leadhit-Site-Id":`${inputSiteId}`

    },
  })

  const data:MyApiData = await response.json()
  console.log(data)
  if (data.message==='ok'){
    localStorage.setItem('Leadhit-Site-Id',inputSiteId)
    navigate('/analytics')}

}