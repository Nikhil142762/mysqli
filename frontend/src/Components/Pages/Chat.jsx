import React from 'react'

function Chat() {
  return (
    <>
     <>
  {/* BEGIN: Content*/}
  <div className="app-content content ">
    <div className="content-overlay" />
    <div className="header-navbar-shadow" />
    <div className="content-wrapper container-xxl p-0">
      


      <div className="content-body">
       
        


        <div className="row match-height">
          
          <div className="col-lg-4 col-md-6 col-12">
            <div className="card chat-widget">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div className="avatar me-2">
                    <img
                      src="./src/assets/app-assets/images/portrait/small/avatar-s-20.jpg"
                      alt="Avatar"
                      width={34}
                      height={34}
                    />
                    <span className="avatar-status-online" />
                  </div>
                  <h5 className="mb-0">Carrie Hawkins</h5>
                </div>
                <i
                  data-feather="more-vertical"
                  className="font-medium-3 cursor-pointer"
                />
              </div>
              <section className="chat-app-window">
                <div className="user-chats">
                  <div className="chats">
                    <div className="chat">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-11.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>How can we help? We're here for you! 😄</p>
                        </div>
                      </div>
                    </div>
                    <div className="chat chat-left">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-20.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>
                            Hey John, I am looking for the best admin template.
                          </p>
                          <p>Could you please help me to find it out? 🤔</p>
                        </div>
                        <div className="chat-content">
                          <p>It should be Bootstrap 4 compatible.</p>
                        </div>
                      </div>
                    </div>
                    <div className="chat">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-11.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>Absolutely!</p>
                        </div>
                        <div className="chat-content">
                          <p>
                            Vuexy admin is the responsive bootstrap 4 admin
                            template.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="chat chat-left">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-20.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>Looks clean and fresh UI. 😃</p>
                        </div>
                        <div className="chat-content">
                          <p>It's perfect for my next project.</p>
                        </div>
                        <div className="chat-content">
                          <p>How can I purchase it?</p>
                        </div>
                      </div>
                    </div>
                    <div className="chat">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-11.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>Thanks, from ThemeForest.</p>
                        </div>
                      </div>
                    </div>
                    <div className="chat chat-left">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-20.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>I will purchase it for sure. 👍</p>
                        </div>
                        <div className="chat-content">
                          <p>Thanks.</p>
                        </div>
                      </div>
                    </div>
                    <div className="chat">
                      <div className="chat-avatar">
                        <span className="avatar box-shadow-1 cursor-pointer">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-11.jpg"
                            alt="avatar"
                            height={36}
                            width={36}
                          />
                        </span>
                      </div>
                      <div className="chat-body">
                        <div className="chat-content">
                          <p>Great, Feel free to get in touch on</p>
                        </div>
                        <div className="chat-content">
                          <p>https://pixinvent.ticksy.com/</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  className="chat-app-form"
                  action="javascript:void(0);"
                  onsubmit="enterChat();"
                >
                  <div className="input-group input-group-merge me-50 w-75 form-send-message">
                    <span className="input-group-text">
                      <label
                        htmlFor="attach-doc"
                        className="attachment-icon mb-0"
                      >
                        <i
                          data-feather="image"
                          className="cursor-pointer text-secondary"
                        />
                        <input type="file" id="attach-doc" hidden="" />{" "}
                      </label>
                    </span>
                    <input
                      type="text"
                      className="form-control message"
                      placeholder="Type your message"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary send"
                    onclick="enterChat();"
                  >
                    <i data-feather="send" className="d-lg-none" />
                    <span className="d-none text-nowrap d-lg-block">Send</span>
                  </button>
                </form>
              </section>
            </div>
          </div>
          
        
        </div>
      </div>
    </div>
  </div>
</>
 
    </>
  )
}

export default Chat
