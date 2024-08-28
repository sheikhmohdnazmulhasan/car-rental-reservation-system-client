import React from 'react';
import { useParams } from 'react-router-dom';

const EditVehicle = () => {
    const { _id } = useParams();
    console.log(_id);
    return (
        <div>
            hello edit
        </div>
    );
};

export default EditVehicle;