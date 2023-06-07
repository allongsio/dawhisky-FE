import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { styled } from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';

// window.kakao 객체를 가져옴
const { kakao } = window;

const KakaoMap = ({ coords, storelist }) => {
  const [markers, setMarkers] = useState([]);

  // * 주소-좌표 변환 객체를 생성
  const geocoder = new kakao.maps.services.Geocoder();

  // * storelist 주소를 지도에 마킹할 수 있도록 x, y값 변환
  useEffect(() => {
    const addMarkers = [];

    storelist.forEach((item) => {
      geocoder.addressSearch(item.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          addMarkers.push({
            position: {
              lat: result[0].address.y,
              lng: result[0].address.x,
            },
            content: item.store,
            id: item.store_id,
            isOverlayVisible: false,
          });
        }
        setMarkers(addMarkers);
      });
    });
  }, [storelist]);

  // * 업장 아이콘 클릭 시 overlay visible true/false
  const onMarkerClickHandler = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, isOverlayVisible: !marker.isOverlayVisible } : marker,
      ),
    );
  };

  return (
    <MapSection>
      {/* 지도를 표시할 Container */}
      <Map
        center={{
          lat: coords.lat,
          lng: coords.lon,
        }}
        style={{
          width: '100%',
          height: '94%',
        }}
        level={4}
      >
        {markers.map((marker) => (
          <React.Fragment key={`marker_${marker.id}`}>
            <MapMarker
              position={marker.position}
              image={{
                src: 'https://cdn-icons-png.flaticon.com/512/2722/2722538.png',
                size: {
                  width: 24,
                  height: 35,
                },
                options: {
                  offset: {
                    x: 15,
                    y: -7,
                  },
                },
              }}
              onClick={() => onMarkerClickHandler(marker.id)}
            />
            {marker.isOverlayVisible && (
              <CustomOverlayMap
                value={marker.isOverlayVisible}
                position={marker.position}
                yAnchor={1}
                onClick={() => onMarkerClickHandler(marker.id)}
              >
                <OverlayDiv onClick={() => alert('hi~')}>
                  {marker.content}
                  <BiChevronRight />
                </OverlayDiv>
              </CustomOverlayMap>
            )}
          </React.Fragment>
        ))}
      </Map>
    </MapSection>
  );
};

export default KakaoMap;

const MapSection = styled.section`
  width: 360px;
  height: 100vh;
  margin-left: -17px;
`;

const OverlayDiv = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border: 1px solid #ececec;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;
