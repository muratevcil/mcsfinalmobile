interface GeneralAPIType<T>{
    timeStamp:string|null,
    code:number|null,
    message:string|null,
    response:T
}
export default GeneralAPIType;