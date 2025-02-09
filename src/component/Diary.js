import React,{ useEffect, useState } from "react";
import Main from "../main/Main";
import Sidebar from "../sidebar/Sidebar";
import { Container } from "react-bootstrap";
import { db } from '../firebase';
import { collection, getDocs, query, where,onSnapshot } from 'firebase/firestore';
import DiaryNavbar from "../navbar/Navbar";
import './Diary.css';

const Diary = ({setLogin}) => {
  const [entries, setEntries]= useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterapplied, setFilterApplied]= useState(false);
  const [filter, setFilter] = useState(false);
  const [filterdate, setFilterDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectdate, setSelectDate] = useState('');
  
  const localuser = JSON.parse(localStorage.getItem("user"));
  const localemail = localuser.email;
  const [localuid, setLocalUid] = useState('');
  useEffect(() => {
    const getData = async () => {
      const data = query(
        collection(db, "personal-diary-tables"),
        where("email", "==", localemail)
      );

      onSnapshot(data, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setLocalUid(doc.id);
        });
      });
    };
    getData();
  }, [localemail]);

  //firestore database collection
  const b = "diary-data";
  
  const fetchPost = async() =>{
    if(!localuid === '') {
      const q = query(collection(db, b), where("uid","==",localuid));
      const querySnapshot= await getDocs(q);
      let array = [];
      querySnapshot.forEach((doc) => {
        array.push({id:doc.id, title:doc.data().title, content:doc.data().content, date:doc.data().date})
      });
      const filteredEntries = array.filter((entry) =>  
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((entry) => {
        const entryDate = new Date(entry.date); 
        if(selectdate) {
          const specific = new Date(selectdate);
          // return entryDate.getDate() === specific.getDate() && entryDate.getMonth() === specific.getMonth()
          return entryDate.getTime() === specific.getTime();
        } else if (!startDate && !endDate) {
          return true; // Return all entries if both dates are not provided
        } else if (startDate && !endDate) {
          return entryDate >= new Date(startDate);
        } else if (!startDate && endDate) {
          return entryDate <= new Date(endDate);
        } else if(startDate && endDate) {
          return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        }
        return true;
      })
      setEntries(filteredEntries);
    }
    };

  useEffect(()=>{
    fetchPost();
  },[startDate,endDate,searchQuery,selectdate,localuid]);

  // input value for selectdate and on input the date clear button visible
  const handleDateChange= (e) => {
    const date= e.target.value;
    setSelectDate(date);
    setFilterDate(true);
  }

  //for clear the selectdate 
  const handleDateFilter = () => {
    setSelectDate('');
    setFilterDate(false);
  }

  // for search the data
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilter(query.length> 0);
  }
  
  //for handle start date and enddate input values
  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'startDate') {
      setStartDate(value);
      setFilterApplied(true);
    } else if (name === 'endDate') {
      setEndDate(value);
      setFilterApplied(true);
      }
  }

  //for handle the clear button of startdate and enddate
  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilterApplied(false);
  }

  // for handle the search data clear button 
  const handleSearchFilter = () => {
    setSearchQuery('');
    setFilter(false);
  }

  return (
    <div>
      <DiaryNavbar setLogin={setLogin} />
      <Container fluid className="diary">
        <Sidebar  setEntries={setEntries} startDate={startDate} endDate={endDate} handleChange={handleChange} 
        handleClearFilter={handleClearFilter} filterapplied={filterapplied} />

        <Main  entries={entries} setEntries={setEntries} fetchPost={fetchPost} handleSearch={handleSearch} 
        searchQuery={searchQuery} handleSearchFilter={handleSearchFilter} filterdate={filterdate} handleDateFilter={handleDateFilter}
        filter={filter} handleDateChange={handleDateChange} selectdate={selectdate} localuid={localuid} />
      </Container>
    </div>
      );
};
export default Diary;