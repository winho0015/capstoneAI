// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { List, Typography } from 'antd';

// const { Title } = Typography;

// function ResultPage() {
//     const [resultVideos, setResultVideos] = useState([]);

//     useEffect(() => {
//         // Result Collection에서 데이터 가져오기
//         Axios.get('/api/result/getResultVideos')
//             .then((response) => {
//                 if (response.data.success) {
//                     setResultVideos(response.data.resultVideos);
//                 } else {
//                     alert('결과 영상을 가져오는 데 실패했습니다.');
//                 }
//             })
//             .catch((err) => console.error(err));
//     }, []);

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>
//             <Title level={2}>Blur Processed Videos</Title>
//             <hr />
//             <List
//                 itemLayout="vertical"
//                 dataSource={resultVideos}
//                 renderItem={(video) => (
//                     <List.Item key={video._id}>
//                         <List.Item.Meta
//                             title={`Original Video: ${video.original_video.title || 'Untitled'}`}
//                             description={`Blur Level: ${video.blur_info.scale}`}
//                         />
//                         <video
//                             src={`http://localhost:5000/${video.result_path}`}
//                             controls
//                             style={{ width: '100%' }}
//                         ></video>
//                         <p>
//                             Created At: {new Date(video.created_at).toLocaleString()}
//                         </p>
//                     </List.Item>
//                 )}
//             />
//         </div>
//     );
// }

// export default ResultPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function ResultPage() {
    const { videoId } = useParams();
    const [resultVideos, setResultVideos] = useState([]);

    useEffect(() => {
        Axios.get(`/api/result/getResultVideos/${videoId}`)
            .then((response) => {
                if (response.data.success) {
                    setResultVideos(response.data.resultVideos);
                } else {
                    alert('결과 비디오를 불러오지 못했습니다.');
                }
            })
            .catch((error) => console.error(error));
    }, [videoId]);

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Result Videos</h2>
            <hr />
            {resultVideos.map((video, index) => (
                <div key={index}>
                    <h3>{`Result Video ${index + 1}`}</h3>
                    <video
                        controls
                        style={{ width: '100%' }}
                        src={`http://localhost:5000/${video.result_path}`}
                    />
                </div>
            ))}
        </div>
    );
}

export default ResultPage;
