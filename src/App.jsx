import { useState, useEffect, useRef} from 'react'
import flower from '/flower-svgrepo-com.svg'
import closeBtn from '/close-circle-svgrepo-com.svg'
// import invitation from '/src/assets/2 surat.png'
import invitation from '/src/assets/placeholder.png'
import invitation2 from '/src/assets/placeholder 2.png'
import './style.css'
import axios from "axios"
import { forwardRef } from 'react'
import { ShimmeringText } from '/src/components/animate-ui/primitives/texts/shimmering';
import HTMLFlipBook from 'react-pageflip';


function QuestionPage({guest}){
    const [isAttending, setIsAttending] = useState(null)
    const [isFormFilled, setIsFormFilled] = useState(false)
    //const [guestNumber, setGuestNumber] = useState(0)
    const guestNumber = useRef("")
    const loggedGuest = guest
    const updateAttendance = (value) => {
        setIsAttending(value)
        }
    const updateIsFormFilled = (value) => {
        setIsFormFilled(value)
        }
    const updateGuest = async(total, attendance) => {
        try {
            const response = await axios.patch(`https://rsvp-app-xd75.onrender.com/guests/${loggedGuest}`,
                {
                   total,
                   attendance
                    })
                console.log(response.data)
            } catch (err){
                console.error(err)
                }
        }

    if(isAttending && isFormFilled){
        return(
            <div className = "q-container">
                <div className = "q-box">
                            <h3>── .✦ Yay! We'll see you there ִ ࣪𖤐.ᐟ </h3>
                                <a className = "btn btn-primary btn-bye-confirmed btn-lg" onClick= {() => location.reload()}> bye for now ヾ( ˃ᴗ˂ )◞ • *✰</a>

                    </div>

            </div>
            )

        }

    else if(isAttending){
        return(
            <div className= "q-container">
                <div className = "q-box">
                            <h2>Who will be coming?</h2>
                            <h1 className = "separator2">✦•┈๑⋅⋯ ⋯⋅๑┈•✦</h1>
                            <div className= "q2-end">
                            <select className = "q2-selectbox" ref = {guestNumber}>
                                <option value = "1" >Just me!</option>
                                <option value = "2">Me & another person</option>
                            </select>
                            <button className= "btn btn-primary btn-pp" onClick = {() => {
                                updateGuest(guestNumber.current.value, isAttending)
                                updateIsFormFilled(true)
                                    }
                                }><i className="fa-solid fa-paper-plane"></i></button>
                            </div>
                    </div>

            </div>
            )
            }

    else if (!isAttending && isAttending != null){
        return(
        <div className= "q-container">
                <div className = "q-box">
                            <h3>Guess we won't be seeing you <br/> then. Thank you for your time! </h3>
                                 <a className = "btn btn-success btn-lg" onClick= {() => location.reload()}> bye bye(ᵔᵕᵔ)◜</a>

                    </div>

            </div>
            )
        }

    return(
        <>
        <div className= "q-container">
                <div className = "q-box">
                            <h2>Will you attend the party?</h2>
                            <h1 className = "separator1">── ⋆⋅☆⋅⋆ ──</h1>
                            <div className = "rsvp-btns">
                                <i className="fa-solid fa-circle-check" onClick={() => updateAttendance(true)}></i>
                                <i className="fa-solid fa-circle-xmark" onClick = {() => {updateAttendance(false)
                                    updateGuest(0, false)}}></i>
                        </div>
                    </div>

            </div>
            </>
            )
    }

function InvitationPage({guestName}){
    const [showElement, setShowElement] = useState(false)
    const [rsvpBtnClicked, setRsvpBtnClicked] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const username = guestName

    const enlargeImage = () => {
        setShowElement(prev => !prev)
        //console.log(showElement)
    }

     const clickRSVP = () => {
        setRsvpBtnClicked(true)
        }

    const movePage = (value) => {
        setPageNum(value)
        }

    const useOutsideClick = (callback) => {
        const ref = useRef(null)

        useEffect(() => {
            const handleClick = (event) => {
                if(ref.current && !ref.current.contains(event.target)){
                    callback()
                }
                }
            document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick, true)
            }

            }, [ref])
        return ref
        }
        const ref = useOutsideClick(enlargeImage)

                return(
                    <>
                    {rsvpBtnClicked && <QuestionPage guest = {username}/>}
                    {!rsvpBtnClicked &&
                    <div className= "container2">
                        <h3 className="invitation-h3">· · ─ ·ʚ You are invited ₊˚⊹ 🎐˖ .ᐟ ɞ· ─ · ·</h3>
                        <div className= "flap"></div>

                        <button className="invitation" onClick = {enlargeImage}></button>
                        {showElement? (
                            <div id="popupImage">
                                     <div className = "flipbook-container" ref = {ref}>
                                         <img src={closeBtn} className="closeBtn" onClick = {enlargeImage}/>
                                        <HTMLFlipBook width={270} height={400} showCover= {true} usePortrait={false}>
                                                <div className="invitationPage cover" key = "1">
                                                        <img className="invitation-image 1" src= {invitation}/>
                                                    </div>
                                                    <div className="invitationPage" key = "2">
                                                        <img className="invitation-image" src= {invitation2}/>
                                                    </div>
                                                     <div className="invitationPage" key = "3">
                                                        <img className="invitation-image" src= {invitation2}/>
                                                    </div>
                                                    <div className="invitationPage" key = "4">
                                                        <img className="invitation-image" src= {invitation}/>
                                                    </div>
                                            </HTMLFlipBook>
{/*                                         <div className = "flipbook"> */}
{/*                                         <img className="invitation-image" src= {invitation} onClick = {() => movePage(2)}/> */}
{/*                                          <img className="invitation-image" src= {invitation2} onClick = {() => movePage(3)}/> */}
                                       </div>
{/*                                     </div> */}
                            </div>
                        ): <></>}
                        <div className = "letter-box">

                        </div>
                        <div className = "top-env"></div>
                        <button className= "btn btn-primary rsvp-btn" onClick = {clickRSVP}>Click here to RSVP!</button>
                    </div>
                    }
                    </>
                )
            }

function ErrorPage(){

                return (

                    <div className="container2">
                        <h3>Sorry, you are not on the guest list ˙◠˙</h3>
                        <button className="btn btn-success" onClick = {()=>{window.close()}}>ok 😬</button>
                    </div>

                )
}

function MainPage() {
    let [count, setCount] = useState(0)
    const [doesGuestExist, setDoesGuestExist] = useState(null)
    const [guestName, setGuestName] = useState("")


    const clickEnter = (name) => {
        try{
            fetch(`https://rsvp-app-xd75.onrender.com/guests/${name}`)
            .then(response => {
                if(!response.ok){
                    setDoesGuestExist(false)
                    return
                    }
                else {
                    setDoesGuestExist(true)
                    return response.json()
                    }

            }
            )
            /*if(!res.ok) {
                // if (res.status === 404) {
                //     console.log("Guest not found")
                //}
                setDoesGuestExist(false)
            }
            else {
                setDoesGuestExist(true)
            }*/

            //console.log("hello")
            //const fetchGuest = await getGuestFunction(guestName.current.value)
            // if (fetchGuest){
            //     setDoesGuestExist(true)
            // }
            //alert(msg)
        }catch (e) {
                console.error(e);
                return "Error!";

            }
    }

    const handleEnter = ()=>{
        clickEnter(guestName)
    }



    useEffect(() => {
        let ignore = false; //for cleanup

        if(!ignore) {
            fetch("https://rsvp-app-xd75.onrender.com/guests")
                .then(response => response.json())
                .then(data => {
                    const rsvped = data.filter(item => item.attendance === true)
                    console.log(data)
                    console.log(rsvped)
                    let totalCount = 0
                    rsvped.forEach(item => totalCount += parseInt(item.total))
                    setCount(totalCount)
                })
        }
        return () => {
            ignore = true;
          };

    });



       // {!doesGuestExist && doesGuestExist != null && <ErrorPage/>}
       // {doesGuestExist && rsvpBtnClicked && <QuestionPage guestName = {guestName}/>}
                return(
                    <>
                     {doesGuestExist && <InvitationPage guestName={guestName} />}
                     {!doesGuestExist && doesGuestExist != null && <ErrorPage/>}
                     {doesGuestExist=== null &&
                    <div className= "container">
                <div className = "box">
                        <div className= "text-box">
                            <span className = "shimmeringText"><ShimmeringText text = "˚₊‧꒰ა ♡ ໒꒱ ‧₊˚ " color="#FFADD9" shimmeringColor="#95D8FC"/></span>
                            <h5 className = "text">Type your username here!</h5>
                            <input className="username-input text" />
                            <button type="button" className="btn btn-primary username-enter text" onClick={handleEnter}>Enter</button>
                        </div>
                    </div>
                    <div className = "counter-box">
                        <div className="counter">
                            <div>
                        <h5 className= "text"> ➽── {count} guests are coming! ───❥</h5>
                    </div>
                    </div>
                </div>

            </div>
            }
                        </>
                )
            }

async function getGuestFunction(name) {
    const res = await fetch(`https://rsvp-app-xd75.onrender.com/guests/${name}`);

    if(!res.ok) {
        // if (res.status === 404) {
        //     console.log("Guest not found")
            return false;
        //}
    }
    //console.log("hello")
    return true;
}


function App() {

  const [guests, setGuests] = useState(null)
  const [guest, setGuest] = useState("")


  return (
    <>
        {<MainPage />}



    </>
  )
}

export default App
