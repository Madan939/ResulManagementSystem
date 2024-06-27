import axios from 'axios'
import React, {useRef, useState } from 'react'
import { APIROUTE } from '../../components/Commonroute'
import { useReactToPrint } from 'react-to-print';
const Results = () => {
  const componentRef=useRef()
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [symbolno, setsymbolno] = useState('')
  const [result, setresult] = useState([])
  function subform(e) {
    e.preventDefault()
    const data = {
      id: Date.now(),
      symbolno: symbolno
    }
    axios.post(`${APIROUTE}result/search-result`, data)
      .then((res) => {
          setresult(res.data);
      })
      .catch(err => {
        alert("Please input correct symbol_no")
        console.log(err)
      })
    setsymbolno('')
  }
  const theorymarks = (theory) => {
    return (theory / 15).toFixed(2)
  }
  const practicalmarks = (practical) => {
    return (practical / 10).toFixed(2)
  }
  const total = (theory, practical) => {
    return (parseFloat(theory) + parseFloat(practical)) / 25;
  };

  const finalmarks = () => {
    let totalFinalMarks = 0;
    result.subjects && result.subjects.forEach(subject => {
      totalFinalMarks += total(subject.theory, subject.practical);
    });
    return (totalFinalMarks / 5).toFixed(2);
  };

  return (
    <>
      <div className='container'>
        <p className='text-center h5 m-4'>Search your results </p><br /><br />
        <form className='m-auto w-50 border mb-3' onSubmit={subform}>
          <div className='m-3 row'>
            <div className='col-8'>
              <input type='text' placeholder='enter your symbol no' className='form-control' onChange={(e) => setsymbolno(e.target.value)} value={symbolno} />
            </div>
            <div className='col-4'><input type='submit' value='search' className='btn btn-primary w-100' /></div>
          </div>
        </form>
        {result && result._id ? (
          <div className='result my-3 container-fluid border w-75 m-auto'>
            <p className='result-paragraph h5 text-center m-4'>Examination Board</p>
            <p className='result-paragraph h3 text-center m-3'>GRADE SHEET</p><br />
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Name of the Student:<i className='mx-4'>{result.name}</i></p>
              <p className='result-paragraph'>Symbol_no:<i className='mx-4'>{result.symbolno}</i></p>
            </div>
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Grade:<i className='mx-4'>{result.grade}</i></p>
              <p className='result-paragraph'>Faculty:<i className='mx-4'>{result.faculty}</i></p>
              <p className='result-paragraph'>Semester/Year:<i className='mx-4'>{result.semesteryear}</i></p>
            </div><br />
            <table className='table table-bordered'>
              <thead>
                <tr className='result-table-head text-center'>
                  <th>SN</th>
                  <th>SUBJECTS</th>
                  <th>CREDIT HOUR</th>
                  <th>TH</th>
                  <th>PR</th>
                  <th>FINAL</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects && result.subjects.map((item, idx) => (
                  <tr key={item.name}>
                    <td className='text-center'>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.credithour}</td>
                    <td className='text-center'>{theorymarks(item.theory)}</td>
                    <td className='text-center'>{practicalmarks(item.practical)}</td>
                    <td className='text-center'>{total(item.theory, item.practical)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <th colSpan="4" className="gpa text-center">GRADE POINT AVERAGE(GPA):</th>
                  <td colSpan="1" className="text-center">{finalmarks()}</td>
                </tr>
              </tfoot>
            </table>
            <br />
            <div>
              <p className='result-paragraph'>1.ONE CREDIT HOURS EQUALS 4 CLOCK HOURS</p>
              <p className='result-paragraph'> TH:Theory,PR:Practical</p>
            </div>
            <br />
            <button type="button" className="btn btn-primary" onClick={openModal}>
            Print result
          </button>
          <br/><br/>
          {isOpen && (
        <div  className="modal fade show" tabIndex="1" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body"ref={componentRef} >
                <div className='card'>
                  <div className='container'>
                  <div className='result my-3 container-fluid border m-auto'>
            <p className='result-paragraph h5 text-center m-4'>Examination Board</p>
            <p className='result-paragraph h3 text-center m-3'>GRADE SHEET</p><br />
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Name of the Student:<i className='mx-4'>{result.name}</i></p>
              <p className='result-paragraph'>Symbol_no:<i className='mx-4'>{result.symbolno}</i></p>
            </div>
            <div className='d-flex justify-content-around'>
              <p className='result-paragraph'>Grade:<i className='mx-4'>{result.grade}</i></p>
              <p className='result-paragraph'>Faculty:<i className='mx-4'>{result.faculty}</i></p>
              <p className='result-paragraph'>Semester/Year:<i className='mx-4'>{result.semesteryear}</i></p>
            </div><br />
            <table className='table table-bordered'>
              <thead>
                <tr className='result-table-head text-center'>
                  <th>SN</th>
                  <th>SUBJECTS</th>
                  <th>CREDIT HOUR</th>
                  <th>TH</th>
                  <th>PR</th>
                  <th>FINAL</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects && result.subjects.map((item, idx) => (
                  <tr key={item.name}>
                    <td className='text-center'>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td className='text-center'>{item.credithour}</td>
                    <td className='text-center'>{theorymarks(item.theory)}</td>
                    <td className='text-center'>{practicalmarks(item.practical)}</td>
                    <td className='text-center'>{total(item.theory, item.practical)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <th colSpan="4" className="gpa text-center">GRADE POINT AVERAGE(GPA):</th>
                  <td colSpan="1" className="text-center">{finalmarks()}</td>
                </tr>
              </tfoot>
            </table>
            <br />
            <div>
              <p className='result-paragraph'>1.ONE CREDIT HOURS EQUALS 4 CLOCK HOURS</p>
              <p className='result-paragraph'> TH:Theory,PR:Practical</p>
            </div>
            </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)} aria-label="Close">Close</button>
                <button type="button" className="btn btn-success">Download</button>
                <button type="button" className="btn btn-primary" onClick={handleprint}>Print Result</button>
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
        ) : (
          <p></p>
        )}

      </div>
    </>
  )
}

export default Results
