import React from 'react'

function PageNotFound() {
    return (
        <div className="container text-center mt-5">
            <div className="alert alert-danger" role="alert">
                <h1 className="display-4">Errore</h1>
                <p className="lead">Qualcosa è andato storto. Si prega di riprovare più tardi.</p>
                <hr />
                <p className="mb-0">Se il problema persiste, contatta il supporto tecnico.</p>
            </div>
        </div>
    );
}

export default PageNotFound;