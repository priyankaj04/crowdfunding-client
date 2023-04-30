import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loading = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 5, 5, 0, 0],
                            y: [0, 0, 5, 5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 10, height: 10 }}
                    />
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 5, 5, 0, 0],
                            y: [0, 0, 5, 5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 10, height: 10 }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 5, 5, 0, 0],
                            y: [0, 0, 5, 5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 10, height: 10 }}
                    />
                    <motion.div
                        animate={{
                            borderRadius: ['20%', '50%', '50%', '20%'],
                            scale: [1, 0.6, 0.6, 1],
                            rotate: [270, 0, 270, 0, 270],
                            x: [0, 5, 5, 0, 0],
                            y: [0, 0, 5, 5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ background: "linear-gradient(90deg, #c2410c, #f97316, #fed7aa)", width: 10, height: 10 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Loading
