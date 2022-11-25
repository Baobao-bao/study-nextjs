import { useRef, useEffect, useCallback, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function TopForm() {
  return (
    <div className="absolute inset-0 bg-black opacity-50 flex-center">
      <div className="text-white">Join</div>
    </div>
  );
}
