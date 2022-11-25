import { useRef, useEffect, useCallback, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

export default function JoinPopup() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [shake, setShake] = useState(false);

  const isPrivate = true;

  const enterRoom = () => {
    if (!password) {
      console.log('cannot be empty');
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
    } else {
      console.log('remove the popup');
    }
  };

  return (
    <div className="join-popup absolute inset-0 bg-[#000000bb] flex-center z-[1]">
      <div className="w-2/5 min-w-[300px] bg-white p-8 z-[1] rounded-[16px] text-center">
        <div className="title font-bold text-lg mb-4">
          Welcome to the Room!!!
        </div>

        {isPrivate && (
          <div>
            <div>
              <span className="text-red-500">*</span>
              <span className="text-gray-400 text-sm">请输入房间密码</span>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={classNames(
                'border-gray-500 border rounded-sm px-2 outline-purple-600 mt-1',
                shake && 'animate-shake'
              )}
              type="text"
              placeholder="在此填写密码"
            />
          </div>
        )}

        <div className="text-gray-400 text-sm mt-2">填写用户名(非必填)</div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="border-gray-500 border rounded-sm px-2 outline-purple-600 mt-1"
          type="text"
          placeholder="小蜜蜂1号(自动生成)"
        />

        <div className="max-sm:flex-col buttons flex justify-around gap-x-4">
          <div
            onClick={enterRoom}
            className="rounded-full bg-purple-500 min-w-fit h-8  w-2/5 max-w-60 px-2 text-white flex-center mt-4 mx-auto cursor-pointer"
          >
            Enter Room
          </div>
          <div className="rounded-full border-purple-500 border-2 min-w-fit h-8  w-2/5 max-w-60 px-2 flex-center mt-4 mx-auto  cursor-pointer">
            Go to the Lobby
          </div>
        </div>
      </div>
    </div>
  );
}
