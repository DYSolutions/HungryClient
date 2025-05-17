import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-400 text-white p-4">
      <div className="flex flex-row w-full justify-between items-start">
        <div className="flex flex-col gap-2 text-[13px] w-[150px]">
          <h3 className="text-white font-bold text-[20px]">HUNGRY</h3>
          <span className="text-white">Have food & share love</span>
          <span className="text-white">Hungry is a platform that connects food lovers with local restaurants and food vendors.</span>
          <span className="text-white">Address : No 32 , Colombo , Srilanka</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold text-[20px]">Quick Links</h3>
          <Link href="/" className="text-white hover:text-gray-200">Home</Link>
          <Link href="/about" className="text-white hover:text-gray-200">About Us</Link>
          <Link href="/contact" className="text-white hover:text-gray-200">Contact Us</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold text-[20px]">Follow Us</h3>
          <Link href="/facebook" className="text-white hover:text-gray-200">Facebook</Link>
          <Link href="/twitter" className="text-white hover:text-gray-200">Twitter</Link>
          <Link href="/instagram" className="text-white hover:text-gray-200">Instagram</Link>
        </div>

        <div className="flex flex-col items-end gap-2 w-[300px]">
          <input type="text" placeholder="Subscribe to our newsletter" className="p-2 w-[300px] rounded-md border bg-white text-black text-[13px]" />
          <button className="bg-white text-green-400 w-[100px] p-2 rounded-md hover:bg-gray-200 cursor-pointer">Subscribe</button>
        </div>
      </div>

      <div className="container mx-auto text-center">
        <p>&copy; 2025 My Website. All rights reserved.</p>
        <p>
          <Link href="/privacy-policy" className="text-gray-900 hover:text-white">
            Privacy Policy
          </Link>
          {' | '}
          <Link href="/terms-of-service" className="text-gray-900 hover:text-white">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;