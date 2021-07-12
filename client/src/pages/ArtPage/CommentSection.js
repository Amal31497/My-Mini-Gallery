import React, { useRef, useEffect, useState } from 'react';
import { useArtContext } from "../../utils/GlobalState";
import { FiSend } from 'react-icons/fi';
import { addComment, updateArt, loadComments, getOneArt, getArtist, updateComment } from '../../utils/API';
import placeholder from '../assets/artist.jpg';
import { Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';


const CommentSection = () => {
    const [_, dispatch] = useArtContext();
    const artId = window.location.search.split("?")[1];
    const [artist, setArtist] = useState();
    const [comments, setComments] = useState();
    const [responseBox,setResponseBox] = useState(false);

    const commentRef = useRef();
    const responseRef = useRef();

    useEffect(() => {
        getArtist(_.user)
            .then(response => {
                // console.log(response.data)
                setArtist({
                    username:response.data.username,
                    avatar: response.data.avatar,
                    description: response.data.description,
                    firstName: response.data.firstName
                })
            })
            .catch(error => console.log(error))
    },[_.user])


    const handleCommentSubmit = (event) => {
        event.preventDefault();          
        const comment = {
            content: commentRef.current.value,
            userInfo: artist,
            date: Date.now(),
            user: _.user
        }
        // console.log(comment)
        if(artId){
            addComment(comment)
                .then(response => {
                    updateArt(artId,{_id:response.data._id})
                        .then(response => {
                            // console.log(response)
                            commentRef.current.value = null;
                            showComments();
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }

    const handleResponseSubmit = (event) => {
        event.preventDefault();

        const response = {
            content: responseRef.current.value,
            userInfo: artist,
            date: Date.now(),
            user: _.user
        }
        console.log(response)
        if (response.content && event.target.getAttribute("value")) {
            updateComment(event.target.getAttribute("value"), { response: response })
                .then(res => {
                    closeReponseBox(event);
                    showComments();
                    showComments();
                })
                .catch(error => console.log(error))
        }
    }



    const openResponseBox = (event) => {
        event.preventDefault();
        setResponseBox(true)
    }

    const closeReponseBox = (event) => {
        event.preventDefault();
        setResponseBox(false);
    }


    const showComments = () => {
        getOneArt(artId)
            .then(response => {
                // console.log(response.data)
                // setComments(response.data.comments)
                var targetedComments = response.data.comments;
                loadComments()
                    .then(response => {
                        // console.log(response.data)
                        var artComments = [];
                        response.data.map(comment => {
                            if(targetedComments.includes(comment._id)){
                                return artComments.push(comment);
                            }
                        })
                        setComments(artComments)
                    })
            })
    }
    useEffect(() => {
        showComments();
    },[])


    return(
        <>

            { _.user ? 
                <div className="addOrJoin col-12">
                    <div className="row" style={{ width: "100%" }}>
                        <div className="col-12">
                            <h5>COMMENTS &nbsp; {comments?comments.length:null}</h5>
                            <textarea className="addComment" rows={1} ref={commentRef} />
                            <FiSend size={30} style={{ marginBottom: "25px", marginLeft: "5px" }} onClick={handleCommentSubmit} />
                        </div>
                    </div>
                </div>
                :
                <div className="addOrJoin col-12">
                    <h5 className="col-12">Join My-Mini-Gallery to add your comment or
                        <span>
                            <a href="/login">
                                LogIn
                            </a>
                        </span>
                    </h5>
                </div>
            }
            <div className="col-12">
                {comments && comments.length > 0 ?
                    comments.map((comment,index) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-1">
                                        {comment ? 
                                            <img className="commentArtistThumbnail" src={comment.userInfo.avatar.avatarSrc||null}  alt={comment.userInfo.username}/>
                                            :
                                            <Spinner animation="grow" variant="dark" />
                                        }
                                    </div>
                                    <div className="commentWrapper col-11">
                                        {comment? 
                                            <>
                                                <div className="mainComment">
                                                    <h6>
                                                        {comment.userInfo.username}
                                                        &nbsp;
                                                        &nbsp;
                                                        <strong><i><Moment fromNow>{comment.date}</Moment></i></strong>
                                                    </h6>
                                                    &nbsp;<p>-&nbsp;{comment.content}</p>
                                                </div>
                                                <div className="row mainCommentConsole">
                                                    <p className="commentReply" onClick={openResponseBox}>Reply</p>
                                                    &nbsp;|&nbsp;
                                                    <p>{comment.responses.length} Replies</p>
                                                    &nbsp;|&nbsp;
                                                    <p className="reportButtons">Report</p>
                                                </div>   
                                                <div>
                                                    {responseBox == true ?
                                                        <>
                                                            <div className="responseBox">
                                                                <textarea className="row responseText" type="text" rows={1} ref={responseRef}/>
                                                                <div className="row responseButtonGroup">
                                                                    <p className="responseButtons" onClick={handleResponseSubmit} value={comment._id}>Respond</p>&nbsp;
                                                                    <p className="responseButtons" onClick={closeReponseBox}>CANCEL</p>
                                                                </div>
                                                            </div>
                                                            <br />
                                                        </>
                                                        :
                                                        null
                                                    }
                                                </div>                                                                                                                                              
                                                {comment.responses.length > 0 ?
                                                    comment.responses.map(response => {
                                                        return(
                                                            <>
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    {response ?
                                                                        <img className="commentArtistThumbnail" src={response.userInfo.avatar.avatarSrc} alt={response.userInfo.username} />
                                                                        :
                                                                        <img className="commentArtistThumbnail" src={placeholder} alt="artist" />
                                                                    }
                                                                </div>
                                                                <div className="col-11 responseBox">
                                                                    <h6>
                                                                        {response.userInfo.username} replied&nbsp;&nbsp;
                                                                        <strong><i><Moment fromNow>{response.date}</Moment></i></strong>
                                                                    </h6>
                                                                    &nbsp;
                                                                    <p>-&nbsp;{response.content}</p>
                                                                </div>
                                                                <div className="col-1" />
                                                                <p className="col-1 reportButtons" id="responseReportButton">Report</p>
                                                            </div>
                                                            </>
                                                        )
                                                    })
                                                    :
                                                    null
                                                }
                                            </>
                                            :
                                            <Spinner animation="grow" variant="dark" />
                                        }
                                        <br />
                                    </div> 
                                </div>
                                
                            </>
                        )
                    })
                    :
                    <h3>No comments added yet.</h3>
                }
            </div>
        </>
    )
}

export default CommentSection;