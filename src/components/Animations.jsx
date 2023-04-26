import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

const Animations = () => {
    const elementRef = useRef(null);
    const element1Ref = useRef(null);
    const element2Ref = useRef(null);
    const element3Ref = useRef(null);
    const element4Ref = useRef(null);
    const element5Ref = useRef(null);

    useEffect(() => {
        var tl = anime.timeline({
            easing: 'spring(1, 80, 10, 0)',
            duration: 850,
        });

        tl
            .add({
                targets: elementRef.current,
                width: '100%',
                background: '#431407',
            })
            .add({
                targets: element1Ref.current,
                width: '100%',
                background: ['#431407','#7c2d12'],
            }, 250)
            .add({
                targets: element2Ref.current,
                width: '100%',
                background: ['#7c2d12','#9a3412'],
            }, 450)
            .add({
                targets: element3Ref.current,
                width: '100%',
                background: ['#9a3412','#c2410c'],
            }, 600)
            .add({
                targets: element4Ref.current,
                width: '100%',
                background: ['#c2410c','#ea580c'],
            }, 750)
            .add({
                targets: element5Ref.current,
                width: '100%',
                background: ["#ea580c",'#f97316'],
            }, 850);
    }, []);

  return (
    <div style={{position:'absolute', width: '100%', height: '100%'}}>
          <div ref={elementRef} style={{ width: 50, height: "100%", color: 'black', background: '#fffff' }}>
              <div ref={element1Ref} style={{ width: 0, height: "100%", color: 'black' }}>
                  <div ref={element2Ref} style={{ width: 0, height: "100%", color: 'black' }}>
                      <div ref={element3Ref} style={{ width: 0, height: "100%", color: 'black' }}>
                          <div ref={element4Ref} style={{ width: 0, height: "100%", color: 'black' }}>
                              <div ref={element5Ref} style={{ width: 0, height: "100%", color: 'black' }}>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Animations
