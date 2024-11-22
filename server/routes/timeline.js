const express = require('express');
const router = express.Router();
const { Timeline } = require('../models/Timeline');


// 타임라인 저장 라우터
router.post('/uploadTimeline', (req, res) => {
    const timeline = new Timeline(req.body); // 클라이언트에서 전달받은 데이터를 기반으로 타임라인 생성

    timeline.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, doc });
    });
});


// 타임라인 데이터 불러오기
router.get('/getTimeline', (req, res) => {
    const videoId = req.query.videoId;

    // 해당 비디오에 연결된 타임라인 검색
    Timeline.find({ video_id: videoId })
        .populate('video_id') // 필요하면 비디오 데이터를 함께 가져옴
        .exec((err, timelines) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, timeline: timelines });
        });
});

{/*}
// 타임라인 정보 삭제
router.delete('/deleteTimeline', (req, res) => {
    const { timelineId, detectedObjectIndex } = req.body;

    // 특정 타임라인에서 탐지 객체 삭제
    Timeline.findById(timelineId, (err, timeline) => {
        if (err || !timeline) {
            return res.status(400).json({ success: false, message: '타임라인 정보를 찾을 수 없습니다.' });
        }

        // 탐지 객체 배열에서 해당 인덱스 제거
        if (detectedObjectIndex >= 0 && detectedObjectIndex < timeline.detected_object.length) {
            timeline.detected_object.splice(detectedObjectIndex, 1);

            // 변경된 타임라인 저장
            timeline.save((saveErr, updatedTimeline) => {
                if (saveErr) {
                    return res.status(400).json({ success: false, message: '타임라인 업데이트 중 오류 발생.', error: saveErr });
                }
                return res.status(200).json({ success: true, updatedTimeline });
            });
        } else {
            return res.status(400).json({ success: false, message: '잘못된 탐지 객체 인덱스입니다.' });
        }
    });
});
*/}


// timeline 삭제
router.post("/deleteTimeline", (req, res) => {

    console.log(req.body)

    Timeline.findOneAndDelete({ start_time: req.body.start_time, end_time: req.body.end_time })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});



// 특정 비디오의 타임라인 정보 가져오기
router.get('/getTimelines/:videoId', (req, res) => {
    const { videoId } = req.params;

    Timeline.find({ video_id: videoId })
        .populate('video_id') // Video 정보도 필요하면 포함
        .exec((err, timelines) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            res.status(200).json({ success: true, timelines });
        });
});


module.exports = router;
