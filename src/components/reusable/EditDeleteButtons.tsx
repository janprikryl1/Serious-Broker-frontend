import React from 'react';
import PropTypes from 'prop-types';
import { FiEdit3 } from 'react-icons/fi';
import { CgTrash } from 'react-icons/cg';
import {LuTrash} from "react-icons/lu";
import { Button, ButtonColor } from './Button.tsx';

export const EditDeleteButtons = ({ onDelete, onEdit, deleteLabel, editLabel }) => {
  return (
    <div className='d-flex gap-3'>
      <Button
        color={ButtonColor.red}
        style={{ padding: '10px', fontWeight: 'normal' }}
        onClick={onDelete}
      >
        <LuTrash />
        {deleteLabel}
      </Button>
      <Button
        color={ButtonColor.lightBrown}
        style={{ padding: '10px', fontWeight: 'normal' }}
        onClick={onEdit}
      >
        <FiEdit3 />
        {editLabel}
      </Button>
    </div>
  );
};

EditDeleteButtons.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  deleteLabel: PropTypes.string.isRequired,
  editLabel: PropTypes.string.isRequired
};


