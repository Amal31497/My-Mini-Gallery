/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';

// Global Context
import { useArtContext } from "../../utils/GlobalState";

// Api endpoints
import {addComment, 
        updateArt, 
        loadComments, 
        getOneArt, 
        getArtist, 
        updateComment, 
        deleteComment } 
from '../../utils/API';

// Styling
import { FiSend } from 'react-icons/fi';
import placeholder from '../../assets/backgroundsAndEssentials/artist.jpg';
import { Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import { useHistory } from 'react-router-dom';



const CommentSection = () => {
    // Global context
    const [_, dispatch] = useArtContext();

    // Window related vars
    const artId = window.location.search.split("?")[1];

    // States
    const [artist, setArtist] = useState();
    const [comments, setComments] = useState();
    const [responseClickId, setResponseClickId] = useState();
    const [responseBox,setResponseBox] = useState(false);

    // useHistory
    const history = useHistory();

    // Refs
    const commentRef = useRef();
    const responseRef = useRef();

    

    // Load current user (setup for comment submission)
    useEffect(() => {
        if(_.user.length > 0){
            getArtist(_.user)
                .then(response => {
                    // console.log(response.data)
                    setArtist({
                        username: response.data.username,
                        avatar: response.data.avatar,
                        description: response.data.description,
                        firstName: response.data.firstName
                    })
                })
                .catch(error => console.log(error))
        }
    },[_.user,artId])

    // Comment submit listener
    const handleCommentSubmit = (event) => {
        event.preventDefault();  

        // Comment
        const comment = {
            content: commentRef.current.value,
            // Nesting descriptive artist info in comment schema
            userInfo: artist,
            date: Date.now(),
            user: _.user,
            art: artId
        }

        if(artId){
            addComment(comment)
                .then(response => {
                    updateArt(artId,{_id:response.data._id})
                        .then(response => {
                            commentRef.current.value = null;
                            showComments();
                            showComments();
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }

    // Response submit listener
    const handleResponseSubmit = (event) => {
        event.preventDefault();

        // Response
        const response = {
            content: responseRef.current.value,
            // Nesting descriptive artist info in response schema
            userInfo: artist,
            date: Date.now(),
            user: _.user
        }

        console.log(response)
        if (response.content && event.target.getAttribute("value")) {
            updateComment(event.target.getAttribute("value"), { response: response })
                .then(res => {
                    setResponseClickId("")
                    showComments();
                    showComments();
                })
                .catch(error => console.log(error))
        }
    }

    // Delete Comment listener
    const commentDelete = (event) => {
        event.preventDefault();

        if(event.target.name){
            deleteComment(event.target.name)
                .then(response => {
                    // console.log(response)
                    showComments();
                })
                .catch(error => console.log(error))
        }
    }

    // Show all comments when page loads
    const showComments = () => {
        getOneArt(artId)
            .then(response => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[artId])

    const openArtist = (event) => {
        event.preventDefault();
        history.push(`/profile?${event.target.getAttribute("id")}`)
        window.scrollTo(0, 0)
    }

    return(
        <>
            {_.user.length ? 
                // Comments or Login
                <div className="addOrJoin col-12">
                    <div className="row ml-auto mr-auto mb-5" style={{ width: "85%" }}>
                        <div className="col-12">
                            <h5>COMMENTS &nbsp; {comments ? comments.length : null}</h5>
                            <textarea className="addComment" rows={1} ref={commentRef} />
                            <FiSend
                                size={30}
                                style={{ marginBottom: "25px", marginLeft: "5px" }}
                                className="sendCommentButtonIcon"
                                onClick={handleCommentSubmit}
                            />
                        </div>
                    </div>
                </div>
                :
                <div className="addOrJoin col-12">
                    <p className="col-12" style={{ display: "flex", justifyContent: "center" }}><a href="/signup">Join</a> &nbsp; My-Mini-Gallery to add your comment or
                        &nbsp;
                        <span>
                            <a href="/login">
                                LogIn
                            </a>
                        </span>
                    </p>
                </div>
            }
            <div className="col-12">
                {/* Main comment section */}
                {comments && comments.length > 0 ?
                    comments.map((comment,index) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-1">
                                        {comment ? 
                                            <img 
                                                className="commentArtistThumbnail commentMainArtistThumbnail" 
                                                src={comment.userInfo.avatar ? comment.userInfo.avatar.avatarSrc:placeholder}  
                                                alt={comment.userInfo.username}
                                                id={comment.user}
                                                onClick={openArtist}
                                            />
                                            :
                                            <Spinner animation="grow" variant="dark" />
                                        }
                                    </div>
                                    <div className="commentWrapper col-9">
                                        {comment? 
                                            <>
                                                <div className="mainComment">
                                                    <p>
                                                        {comment.userInfo.username + " "}
                                                        <i><Moment fromNow>{comment.date}</Moment></i>
                                                        {/* If user is logged in give permission to delete comment */}
                                                        {comment.user === _.user ?
                                                            <button 
                                                                onClick={commentDelete} 
                                                                style={{ float: "right", background: "none", border: "none" }} 
                                                                name={comment._id} type="button" 
                                                                className="btn btn-danger commentDelete">
                                                                [x]
                                                            </button>
                                                            :
                                                            null
                                                        }
                                                    </p>
                                                    <p>-&nbsp;{comment.content}</p>
                                                </div>
                                                <div className="row mainCommentConsole">
                                                    <p className="commentReply" onClick={() => setResponseClickId(comment._id)} id={comment._id}>Reply</p>
                                                    &nbsp;|&nbsp;
                                                    <p>{comment.responses.length} Replies</p>
                                                    &nbsp;|&nbsp;
                                                    <p className="reportButtons">Report</p>
                                                </div>   
                                                <div>
                                                    {responseClickId === comment._id ?
                                                        <>
                                                            <div className="responseBox">
                                                                <textarea className="row responseText" type="text" rows={1} ref={responseRef} />
                                                                <div className="row responseButtonGroup">
                                                                    <p className="responseButtons" onClick={handleResponseSubmit} value={comment._id}>Respond</p>&nbsp;
                                                                    <p className="responseButtons" onClick={() => setResponseClickId("")}>CANCEL</p>
                                                                </div>
                                                            </div>
                                                            <br />
                                                        </>
                                                        :
                                                        null
                                                    }
                                                </div>
                                                {/* Responses */}
                                                {comment.responses.length > 0 ?
                                                    comment.responses.map(response => {
                                                        return(
                                                            <>
                                                                <div className="row">                                                                   
                                                                    <div className="col-2">
                                                                        {response ?
                                                                            <img 
                                                                                className="commentArtistThumbnail" 
                                                                                src={response.userInfo.avatar ? response.userInfo.avatar.avatarSrc:placeholder} 
                                                                                alt={response.userInfo.username} 
                                                                                id={response.user}
                                                                                onClick={openArtist}
                                                                            />
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                    
                                                                    <div className="col-10 responseBox">
                                                                        <p>
                                                                            {response.userInfo.username} replied {" "}
                                                                            <i><Moment fromNow>{response.date}</Moment></i>
                                                                        </p>
                                                                    <p>-&nbsp;{response.content}</p>
                                                                    </div>
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
                    <p style={{display:"flex", justifyContent:"center"}}>No comments added yet.</p>
                }
            </div>
        </>
    )
}

export default CommentSection;