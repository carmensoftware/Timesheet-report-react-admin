import axiosAuth from "../../utils/request";


export async function getReportList(groupName){
    let uri = groupName === undefined?`/api/report`: `/api/report?q={"WhereRaw":"ReportGroup='${groupName}'"}`;
    const {data} = await axiosAuth.get(uri);
    return data;
}


export async function getReport(id){
    const uri = `/api/report/${id}`;
    console.log("uri = ", uri);
    const {data} = await axiosAuth.get(uri);
    return data;
}


