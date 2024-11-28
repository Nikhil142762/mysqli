import React from 'react'
import Navbar from '../Includes/Navbar'
import Sidebar from '../Includes/Sidebar'

function Contactus() {
    return (
        <>
        <Navbar/>

        <Sidebar/>
            <div className="app-content content ">
                <div className="content-overlay" />
                <div className="header-navbar-shadow" />
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row">
                        <div className="content-header-left col-md-9 col-12 mb-2">
                            <div className="row breadcrumbs-top">
                                <div className="col-12">
                                    <h2 className="content-header-title float-start mb-0">
                                        DataTables

                                    </h2>
                                    <div className="breadcrumb-wrapper">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">Home</a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="#">Datatable</a>
                                            </li>
                                            <li className="breadcrumb-item active">Advanced</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                            <div className="mb-1 breadcrumb-right">
                                <div className="dropdown">
                                    <button
                                        className="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i data-feather="grid" />
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item" href="app-todo.html">
                                            <i className="me-1" data-feather="check-square" />
                                            <span className="align-middle">Todo</span>
                                        </a>
                                        <a className="dropdown-item" href="app-chat.html">
                                            <i className="me-1" data-feather="message-square" />
                                            <span className="align-middle">Chat</span>
                                        </a>
                                        <a className="dropdown-item" href="app-email.html">
                                            <i className="me-1" data-feather="mail" />
                                            <span className="align-middle">Email</span>
                                        </a>
                                        <a className="dropdown-item" href="app-calendar.html">
                                            <i className="me-1" data-feather="calendar" />
                                            <span className="align-middle">Calendar</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <section id="ajax-datatable">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header border-bottom">
                                            <h4 className="card-title">Ajax Sourced Server-side</h4>
                                        </div>
                                        <div className="card-datatable">
                                            <table className="datatables-ajax table table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>Full name</th>
                                                        <th>Email</th>
                                                        <th>Position</th>
                                                        <th>Office</th>
                                                        <th>Start date</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="column-search-datatable">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header border-bottom">
                                            <h4 className="card-title">Column Search</h4>
                                        </div>
                                        <div className="card-datatable">
                                            <table className="dt-column-search table table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Post</th>
                                                        <th>City</th>
                                                        <th>Date</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Post</th>
                                                        <th>City</th>
                                                        <th>Date</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="advanced-search-datatable">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header border-bottom">
                                            <h4 className="card-title">Advanced Search</h4>
                                        </div>
                                        {/*Search Form */}
                                        <div className="card-body mt-2">
                                            <form className="dt_adv_search" method="POST">
                                                <div className="row g-1 mb-md-1">
                                                    <div className="col-md-4">
                                                        <label className="form-label">Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control dt-input dt-full-name"
                                                            data-column={1}
                                                            placeholder="Alaric Beslier"
                                                            data-column-index={0}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Email:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control dt-input"
                                                            data-column={2}
                                                            placeholder="demo@example.com"
                                                            data-column-index={1}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Post:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control dt-input"
                                                            data-column={3}
                                                            placeholder="Web designer"
                                                            data-column-index={2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row g-1">
                                                    <div className="col-md-4">
                                                        <label className="form-label">City:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control dt-input"
                                                            data-column={4}
                                                            placeholder="Balky"
                                                            data-column-index={3}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Date:</label>
                                                        <div className="mb-0">
                                                            <input
                                                                type="text"
                                                                className="form-control dt-date flatpickr-range dt-input"
                                                                data-column={5}
                                                                placeholder="StartDate to EndDate"
                                                                data-column-index={4}
                                                                name="dt_date"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                className="form-control dt-date start_date dt-input"
                                                                data-column={5}
                                                                data-column-index={4}
                                                                name="value_from_start_date"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                className="form-control dt-date end_date dt-input"
                                                                name="value_from_end_date"
                                                                data-column={5}
                                                                data-column-index={4}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Salary:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control dt-input"
                                                            data-column={6}
                                                            placeholder={10000}
                                                            data-column-index={5}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <hr className="my-0" />
                                        <div className="card-datatable">
                                            <table className="dt-advanced-search table">
                                                <thead>
                                                    <tr>
                                                        <th />
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Post</th>
                                                        <th>City</th>
                                                        <th>Date</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th />
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Post</th>
                                                        <th>City</th>
                                                        <th>Date</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="responsive-datatable">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header border-bottom">
                                            <h4 className="card-title">Responsive Datatable</h4>
                                        </div>
                                        <div className="card-datatable">
                                            <table className="dt-responsive table">
                                                <thead>
                                                    <tr>
                                                        <th />
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Post</th>
                                                        <th>City</th>
                                                        <th>Date</th>
                                                        <th>Salary</th>
                                                        <th>Age</th>
                                                        <th>Experience</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th />
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Post</th>
                                                        <th>City</th>
                                                        <th>Date</th>
                                                        <th>Salary</th>
                                                        <th>Age</th>
                                                        <th>Experience</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contactus
