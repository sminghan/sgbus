export default async (request, context) => {
    const API_KEY = Netlify.env.get("BUS_KEY");
    const url = new URL(request.url);
    const BusStopCode = url.searchParams.get("BusStopCode")
    
    const myHeaders = new Headers();
    myHeaders.append("AccountKey", API_KEY);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const urlString = "https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=" + BusStopCode;

    const response = await fetch(urlString, requestOptions)
    const jsonData = await response.json()
    
    return Response.json(jsonData);
}

export const config = { path: "/get-bus-timings" };
