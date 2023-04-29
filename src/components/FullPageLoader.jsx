import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FullPageLoader = (props) => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 1);
            } else {
                clearInterval(intervalId);
            }
        }, props.time);

        return () => clearInterval(intervalId);
    }, [progress]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', gap: 30 }}>
            <motion.p style={{ fontSize: 50, fontWeight: 'bold', color: '#f97316' }} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} >WELCOME!</motion.p>
            <p style={{ fontSize: 20 }}>Loading... {progress}%</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 50, 50, 0, 0],
                            y: [0, 0, 50, 50, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 50, height: 50 }}
                    />
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 50, 50, 0, 0],
                            y: [0, 0, 50, 50, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 50, height: 50 }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 50, 50, 0, 0],
                            y: [0, 0, 50, 50, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 50, height: 50 }}
                    />
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 50, 50, 0, 0],
                            y: [0, 0, 50, 50, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 50, height: 50 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default FullPageLoader
