import logo from './logo.svg';
import {useState} from 'react';
import {read,utils} from 'xlsx';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = utils.sheet_to_json(worksheet);
            console.log(json);
            setData(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}
  return (
    <div className="App">
      <form style={{marginTop:'2%'}}> 
        <label htmlFor="upload">Upload File</label>
        <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
        />
     </form>
     <table cellPadding={4} cellSpacing={1} border={1} style={{marginTop:'2%'}}>
      {data.length>0 && (<tr><th>fullName</th><th>address</th><th>identityNumber</th><th>phoneNumber</th><th>status</th><th>rating</th><th>wage</th><th>isVerified</th><th>skillLevel</th><th>receiveJob</th><th>bankName</th><th>bankAccountNumber</th><th>ifscCode</th><th>healthCard</th><th>policeVerification</th><th>gender</th><th>dateOfBirth</th><th>jobId</th><th>skillId</th><th>skillTypeId</th></tr>)}
     {data.map((dataObj, index) => {
          return (
            <tr key={index}><td>{dataObj.fullName}</td><td>{dataObj.address}</td><td>{dataObj.identityNumber}</td><td>{dataObj.phoneNumber}</td><td>{dataObj.status}</td><td>{dataObj.rating}</td><td>{dataObj.wage}</td><td>{dataObj.isVerified}</td><td>{dataObj.skillLevel}</td><td>{dataObj.receiveJob}</td><td>{dataObj.bankName}</td><td>{dataObj.bankAccountNumber}</td><td>{dataObj.ifscCode}</td><td>{dataObj.healthCard}</td><td>{dataObj.policeVerification}</td><td>{dataObj.gender}</td><td>{dataObj.dateOfBirth}</td><td>{dataObj.jobId}</td><td>{dataObj.skillId}</td><td>{dataObj.skillTypeId}</td></tr>
          );
        })}
        </table>
    </div>
  );
}

export default App;
