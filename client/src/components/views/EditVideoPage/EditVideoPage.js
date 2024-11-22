import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { List, Typography, Button } from 'antd';
const { Title } = Typography;

function EditPage({ match }) {
    const [timelines, setTimelines] = useState([]);
    const [video, setVideo] = useState(null);

    const videoId = match.params.videoId; // URL의 videoId를 가져옴

    const onBlurHandler = () => {
        const body = {
            videoId: currentVideoId,
            blurInfoId: selectedBlurInfoId, // 선택된 BlurInfo의 ID
        };
    
        Axios.post('/api/blur/applyBlur', body)
            .then((response) => {
                if (response.data.success) {
                    message.success('Blur 처리 성공!');
                    setTimeout(() => {
                        props.history.push(`/result/${currentVideoId}`);
                    }, 2000);
                } else {
                    alert('Blur 처리에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('서버 오류가 발생했습니다.');
            });
    };
    
    <Button type="primary" onClick={onBlurHandler}>
        Blur
    </Button>
    

    useEffect(() => {
        // Video 데이터 가져오기 (필요 시)
        Axios.get(`/api/video/getVideo/${videoId}`)
            .then((response) => {
                if (response.data.success) {
                    setVideo(response.data.video);
                } else {
                    alert('비디오 정보를 가져오는 데 실패했습니다.');
                }
            })
            .catch((err) => console.error(err));

        // Timeline 데이터 가져오기
        Axios.get(`/api/timeline/getTimelines/${videoId}`)
            .then((response) => {
                if (response.data.success) {
                    setTimelines(response.data.timelines);
                } else {
                    alert('타임라인 정보를 가져오는 데 실패했습니다.');
                }
            })
            .catch((err) => console.error(err));
    }, [videoId]);

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {/* 왼쪽: 비디오 */}
            <div style={{ flex: 1, paddingRight: '20px' }}>
                <Title level={3}>Video Preview</Title>
                {video ? (
                    <video
                        src={`http://localhost:5000/${video.filepath}`}
                        controls
                        style={{ width: '100%' }}
                    ></video>
                ) : (
                    <p>Loading video...</p>
                )}
            </div>

            {/* 오른쪽: 타임라인 */}
            <div style={{ flex: 1 }}>
                <Title level={3}>Timelines</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={timelines}
                    renderItem={(timeline) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`Timeline: ${timeline.start_time} ~ ${timeline.end_time}`}
                                description={
                                    <ul>
                                        {timeline.detected_object.map((obj, index) => (
                                            <li key={index}>
                                                <strong>Type:</strong> {obj.type},{' '}
                                                <strong>Bounding Box:</strong>{' '}
                                                {obj.bounding_box},{' '}
                                                <strong>Time:</strong> {obj.time}s
                                            </li>
                                        ))}
                                    </ul>
                                }
                            />
                            <Button type="primary">Edit</Button>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default EditPage;
