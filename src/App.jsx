import { useState, useEffect, useRef} from 'react'
import closeBtn from '/close-circle-svgrepo-com.svg'
import page2 from '/src/assets/2 surat.png'
import page1 from '/src/assets/1 surat.png'
import page3 from '/src/assets/3 surat.png'
import page4 from '/src/assets/4 surat.png'
//import invitation from '/src/assets/placeholder.png'
//import invitation2 from '/src/assets/placeholder 2.png'
import './style.css'
import axios from "axios"
import { forwardRef } from 'react'
import { ShimmeringText } from '/src/components/animate-ui/primitives/texts/shimmering';
import HTMLFlipBook from 'react-pageflip';
import { SyncLoader } from "react-spinners";

const apiUrl = "https://rsvp-app-098m.onrender.com"

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
            const response = await axios.patch(`${apiUrl}/guests/${loggedGuest}`,
                {
                   total,
                   attendance
                    })
                //console.log(response.data)
            } catch (err){
                //console.error(err)
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
                        <div className="invitation-h3">
                            <h3>· · ─ ·ʚ You are invited ₊˚⊹ 🎐˖ .ᐟ ɞ· ─ · ·</h3>
                            <p>(Click on the card to see the full invitation)</p>
                        </div>
                        <div className="envelope">
                            <div className= "flap"></div>
                            <button className="invitation" onClick = {enlargeImage}></button>
                            {showElement? (
                                <div id="popupImage">
                                         <div className = "flipbook-container" ref = {ref}>
                                             {window.innerWidth > 450? (<HTMLFlipBook width={Math.min(370, window.innerWidth * 0.9)} height={Math.min(400, window.innerHeight * 0.8)} showCover= {true} usePortrait={false}>

                                                    <div className="invitationPage cover" key = "1">
                                                            <img className="invitation-image 1" src= {page2}/>
                                                    </div>
                                                        <div className="invitationPage" key = "2">
                                                            <img className="invitation-image" src= {page4}/>
                                                        </div>
                                                         <div className="invitationPage" key = "3">
                                                            <img className="invitation-image" src= {page3}/>
                                                        </div>
                                                        <div className="invitationPage" key = "4">
                                                            <img className="invitation-image" src= {page1}/>
                                                        </div>
                                                </HTMLFlipBook>) :
                                             <HTMLFlipBook width={290} height={490} showCover= {true} usePortrait={true}>

                                                    <div className="invitationPage cover" key = "1">
                                                            <img className="invitation-image 1" src= {page2}/>
                                                    </div>
                                                        <div className="invitationPage" key = "2">
                                                            <img className="invitation-image" src= {page4}/>
                                                        </div>
                                                         <div className="invitationPage" key = "3">
                                                            <img className="invitation-image" src= {page3}/>
                                                        </div>
                                                        <div className="invitationPage" key = "4">
                                                            <img className="invitation-image" src= {page1}/>
                                                        </div>
                                                </HTMLFlipBook>}

                                           </div>

                                </div>
                            ): <></>}
                            <div className = "letter-box">

                            </div>
                            <div className = "top-env"></div>
                        </div>
                        <button className= "btn btn-primary rsvp-btn" onClick = {clickRSVP}>Click here to RSVP!</button>
                    </div>
                    }
                    </>
                )
            }

function ErrorPage(){

                return (

                    <div className="container2">
                        <div className = "box">
                            <div className = "text-box-sorry">
                                <h2>Sorry, you are not on the guest list ˙◠˙</h2>
                                <button className="btn btn-success btn-lg" onClick = {()=> location.reload()}>ok 😬</button>
                            </div>
                           </div>
                    </div>

                )
}

function MainPage() {
    let [count, setCount] = useState(0)
    const [doesGuestExist, setDoesGuestExist] = useState(null)
    const [guestName, setGuestName] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const clickEnter = (name) => {
        setIsLoading(true)

        try{
            axios.get(`${apiUrl}/guests/${name}`, {timeout: 40000})
            .then(response => {
//                 if(response.status === 404){
//                     setDoesGuestExist(false)
//                     return
//                     }
//                 else {
                    setDoesGuestExist(true)
                    return response.data
                    //}

            }
            )
            .catch(function (error) {
                setDoesGuestExist(false)
                console.log(error.toJSON());
            })
            .finally(() => {
            setIsLoading(false);
        })
        } catch (e) {
                console.error(e);
                return "Error!";

            }
    }


    const handleEnter = ()=>{
        clickEnter(guestName)
    }

    const onKeydownEnter = (event) => {
        if (event.key === "Enter"){
            clickEnter(guestName)
        }
    }

    useEffect(() => {
        let ignore = false; //for cleanup

        if(!ignore) {
            axios.get(`${apiUrl}/guests`)
                .then(response => response.data)
                .then(data => {
                    const rsvped = data.filter(item => item.attendance === true)
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
                        {isLoading && (
                            <div className="loading-overlay">
                                <div className="loading-content">
                                    <span className="loading-text">Please wait... (ᴗ˳ᴗ)ᶻ𝗓𐰁</span>
                                    <SyncLoader color="#FFCFCF" loading={isLoading} />
                                </div>
                            </div>
                        )}
                <div className = "box">
                        <div className= "text-box">
                            <span className = "shimmeringText"><ShimmeringText text = "˚₊‧꒰ა ♡ ໒꒱ ‧₊˚ " color="#FFADD9" shimmeringColor="#95D8FC"/></span>
                            <h5 className = "text">Type your username here!</h5>
                            <input className="username-input text" value = {guestName} onChange = {(e) => setGuestName(e.target.value)} onKeyDown = {onKeydownEnter}/>
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
