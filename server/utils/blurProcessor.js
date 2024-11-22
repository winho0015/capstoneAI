const ffmpeg = require('fluent-ffmpeg');

const applyGaussianBlur = (inputPath, outputPath, timelines, scale) => {
    return new Promise((resolve, reject) => {
        try {
            const filterGraph = timelines.map(({ start_time, end_time }) => {
                return `between(t,${start_time},${end_time})*${scale}`;
            }).join('+');

            ffmpeg(inputPath)
                .videoFilter(`boxblur=enable='${filterGraph}'`)
                .output(outputPath)
                .on('end', () => resolve({ success: true }))
                .on('error', (err) => reject({ success: false, error: err }))
                .run();
        } catch (error) {
            reject({ success: false, error });
        }
    });
};

module.exports = applyGaussianBlur;
