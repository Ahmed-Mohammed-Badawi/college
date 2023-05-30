// FRAMEWORK
import { useRef, useState } from "react";
import Image from "next/image";
// STYLES
import styles from "./PopupChatWindow.module.css";
// NOTIFICATIONS
import { toast } from "react-toastify";

const PopupChatWindow = ({ isOpen, toggle }) => {
    const [messages, setMessages] = useState([]);

    const messageRef = useRef();

    const addNewMessageHandler = (event) => {
        event.preventDefault();
        let message = messageRef.current.value;
        if (!message) {
            return toast.error("Please enter a message");
        } else {
            setMessages([...messages, message ]);
            messageRef.current.value = '';
        }
    };

    return (
        <div className={styles.popupChatContainer}>
            <button className={styles.chatButton} onClick={toggle}>
                <Image
                    src={"/images/message.png"}
                    alt='send'
                    width={22}
                    height={22}
                />
            </button>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <h2 className={styles.chatTitle}>Chat Window</h2>
                    <div className={styles.chatMessages}>
                        {messages.length > 0 &&
                            messages.map((messageItem, index) => {
                                return <p className={styles.MessageText} key={index}>{messageItem}</p>;
                            })}
                    </div>
                    <form
                        className={styles.chatForm}
                        onSubmit={addNewMessageHandler}
                    >
                        <input
                            ref={messageRef}
                            type='text'
                            placeholder='Type your message here'
                            className={styles.chatInput}
                        />
                        <button type='submit' className={styles.chatSubmit}>
                            <Image
                                src={"/images/send_icon.png"}
                                alt='send'
                                width={22}
                                height={22}
                            />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PopupChatWindow;
