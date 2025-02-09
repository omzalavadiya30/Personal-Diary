import { useState } from "react";
import { Button, Modal, Card, Container, Form } from "react-bootstrap";
import { db } from '../firebase';
import Swal from 'sweetalert2';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './Main.css';

const Main = ({entries, setEntries, localuid, fetchPost, filterdate, handleDateFilter, handleSearch, searchQuery, handleSearchFilter, filter, selectdate, handleDateChange}) => {
   
    const [currentEntry, setCurrentEntry] = useState({id:'', title:'', content:'' });    
    const [show, setShow] = useState(false);
    const date= new Date();
    const ddate= date.getDate();
    const dmonth=String(date.getMonth() + 1).padStart(2,"0");
    const dyear= date.getFullYear();
    const cdate= `${dyear}-${dmonth}-${ddate}`
    const [j, setJ]=useState('');


    //show the current data in title or content 
    const handleShow= (index= null) => {
        if(index === null) {
            setCurrentEntry({id:'', title:'', content:''});
            setShow(true);

        } else{
            const id = entries[index].id    
            const title = entries[index].title;
            const content = entries[index].content;
            setCurrentEntry({ id, title, content });
            setShow(true);
        }
    }

    //To operate the modal 
    const handleClose= () => setShow(false);

    // collection name of firestore database
    const b = "diary-data"; 

    //validation of data when data is adding
    const validatedata= () => {
        if (currentEntry.title === "" || currentEntry.content === "") {
            Swal.fire({
              icon: "error",
              title: "Please enter data properly.",
              ConfirmButtonText: "OK",
            });
            return false;
          } else{
            handleSave();
            return true;
        }
    }


    //Add the data to the document
    const handleSave = async() => {
        
        setEntries([...entries, currentEntry]);
        try{
            // if(currentEntry.title === "" || currentEntry.content === ""){
            //     Swal.fire({
            //         icon: "error",
            //         title: "Please enter diary details properly.",
            //         showConfirmButton: true
            //     });
            //     return false;
            // } else {
                const docRef = await addDoc(collection(db, b), {
                    date: cdate,
                    title: currentEntry.title,
                    content: currentEntry.content,
                    uid: localuid
                    });
                    setShow(false);
                    Swal.fire({
                        title: 'Add data Successful.',
                        text: 'The Data has been Successfully added.',
                        icon: 'success',
                        showConfirmButton: true
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setCurrentEntry({id:'', title: '', content:''});
                    fetchPost();
            // }   
            // return true;
        } catch (e) {
            Swal.fire({
                title: 'Add data Failed.',
                text: 'The Data has been Failed to add.',
                icon: 'error',
                showConfirmButton: true
            })
            console.error("Error adding document: ", e);
        }
    }
    
    //update the data of current document data
    const handleEdit = async () => {
        try{
            if(currentEntry.title === "" || currentEntry.content === ""){
                Swal.fire({
                    icon: "error",
                    title: "Please enter data properly.",
                    showConfirmButton: true,
                });
                return false;
            } else {
                await updateDoc( doc(db, b, currentEntry.id),
                {   
                    title: currentEntry.title,
                    content: currentEntry.content,
                }
                );
                setShow(false);
                Swal.fire({
                    title: 'Update data Successful.',
                    text: 'The Data has been Successfully updated.',
                    icon: 'success',
                    showConfirmButton: true
                });
                console.log("Document Update Successfully.");
                fetchPost();
                return true;
            }
        }catch (e) {
            Swal.fire({
                title: 'Update data Failed.',
                text: 'The Data has been Failed to update.',
                icon: 'error',
                showConfirmButton: true
            });
            console.error("Error updating document: ", e);
            }
    };
    
    //delete the data of particular document
    const handleDelete = () => {        
            Swal.fire({
                title: "Do you want to delete it?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result)=> {  
                if(result.isConfirmed){
                    deleteDoc(doc(db, b, currentEntry.id));
                    fetchPost();
                    Swal.fire({
                        title: 'Delete data Successful.',
                        text: 'The Data has been Successfully deleted.',
                        icon: 'success',
                        showConfirmButton: true
                    });
                    console.log("Document Delete Successfully.");
                    setShow(false);
                }
            }).catch((e)=>{
                Swal.fire({
                    title: 'Delete data Failed.',
                    text: 'The Data has been Failed to delete.',
                    icon: 'error',
                showConfirmButton: true
            });
            console.error("Error deleting document: ", e);
        });
    };    

    return(
        <>
        <Container fluid>     
            <Card>
                <Card.Body> 
                    <h1>Diary Entries</h1>
                    <Container className="main" style={{display: "flex"}}>
                        <Button className="btn" variant="primary" type="submit" onClick={() =>{handleShow(); setJ('Add Diary');}} style={{marginRight: "10px"}}>Add</Button>
                        <Form className="form" style={{display:"flex"}}>
                            <Form.Control  type="text" placeholder="Search Diary data" value={searchQuery} onChange={handleSearch} style={{marginRight: "10px"}} />
                            {filter && (
                                <Button className="btn" onClick={handleSearchFilter} style={{marginRight: "10px"}}>Clear</Button>
                            )}
                            <Form.Control type="date" placeholder="Search by dates" value={selectdate} onChange={handleDateChange} style={{marginRight: "10px"}} />
                            {filterdate && (
                                <Button className="btn" onClick={handleDateFilter} style={{marginRight: "10px"}}>Clear</Button>
                            )}
                        </Form>
                    </Container>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{j}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Title" value={currentEntry.title} onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})} />
                                </Form.Group>
                                <Form.Group controlId="content">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter Content" value={currentEntry.content} onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        {currentEntry.id ? 
                        <Modal.Footer>
                            <Button className="btn" variant="primary" onClick={() =>handleEdit()}>Edit</Button>
                            <Button className="btn" variant="primary" onClick={() =>handleDelete()}>Delete</Button>
                        </Modal.Footer> : 
                        <Modal.Footer>
                            <Button className="btn" variant="primary" onClick={()=> validatedata()}>Add</Button>
                        </Modal.Footer>
                        }
                    </Modal>
                    {   entries.length > 0 ? (
                        <div  style={{overflow: "auto", height: "71vh"}}>
                        <hr/>
                        <Card  className="bg-danger">
                            <Card.Body>
                                {entries.map((entry, index) => (
                                    <Card>
                                        <Card.Body> 
                                            <EntryItem key={index} entry={entry} onShow={()=>{handleShow(index); setJ('Edit Diary')}}  />       
                                        </Card.Body>
                                    </Card>        
                                ))}
                            </Card.Body>
                        </Card>
                        </div>) :
                        <div>
                            <hr/>
                            <br/>
                            <h2>No Diary Entries Found.</h2>
                        </div>
                    }
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

const EntryItem = ({entry, onShow}) => {
    return(
        <>
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <h6>{entry.date}</h6>
            <Button className="btn" type="submit" onClick={onShow} >View</Button>
        </>
    );
};
export default Main;