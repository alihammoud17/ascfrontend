import { Flex, Heading, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
  return (
    <>
      <Flex justify="space-around" align="center">
        <Flex justify="space-around">
          <NextLink href="https://www.gotocme.com/" passHref>
            <Link>
              <Image
                w={['80px', '90px', '100px', '110px', '120px']}
                h={['80px', '90px', '100px', '110px', '120px']}
                src="images/cme-logo.png"
                alt="Arabic Spelling Corrector - CME"
              ></Image>
            </Link>
          </NextLink>
        </Flex>
        <Flex justify="flex-start">
          <Heading>Arabic Spelling Corrector</Heading>
        </Flex>
      </Flex>
      <Flex w="100%">
        <Image
          src="images/main-img.jpg"
          alt="Arabic Spelling Corrector"
        ></Image>
      </Flex>
    </>
  );
}
