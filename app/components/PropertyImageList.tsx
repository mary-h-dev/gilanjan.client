'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';



const PropertyImageList = ({ imageUrls }: { imageUrls: string[] }) => {
  const isSmallScreen = useMediaQuery('(max-width:750px)');
  const cols = isSmallScreen ? 1 : 3;


  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll', borderRadius: '8px'}}>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {imageUrls.map((url, index) => (
          <ImageListItem key={index}>
            <Image
              src={url}
              alt={`تصویر ${index + 1}`}
              width={248}
              height={248}
              loading="lazy"
              style={{ width: '100%', height: 'auto' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default PropertyImageList;
