export default function Footer() {

    return (
      <footer className="text-white py-10 sm:py-20 px-2 sm:px-1">
        <div className="  px-7 pl-15 max-lg:px-3 max-lg:pl-7  flex justify-center   gap-10 max-lg:gap-7 ">
          <div className="flex-2 mb-8 ">
            <img 
              src="/images/logo/logo.svg" 
              alt="Comment's Fusion Logo" 
              className="w-40 " 
            />
            <p className="text-small ml-2 sm:ml-1 max-md:text-[13px] ">Comments with solution</p>
            <p className="mt-8 max-lg:mt-6 max-md:mt-4 text-md  text-white/90 max-lg:text-[13px] max-md:text-[11px]">
              Stay ahead with AI-powered commenting!
            </p>
            <p className="text-md text-white/70 mt-1 leading-relaxed max-lg:text-[13px] max-md:text-[11px]">
              Transform your social interactions with smart, personalized, and engaging responses that drive meaningful conversations.
            </p>
          </div>
          {/* Divider */}
          <div className=" w-px bg-white/30 h-65 max-lg:h-57 " />
          {/* Contact Info */}
          <div className="flex-1 mb-8 lg:mb-0">
            <h3 className="text-lg font-bold mb-4 max-lg:text-[16px] max-md:text-[14px]">Contact information</h3>
            <p className="text-sm max-lg:text-[13px] max-md:text-[11px]">Phone:</p>
            <p className="text-sm mb-6 max-lg:mb-4 max-lg:text-[13px] max-md:text-[11px]"> +923289603143</p>
            <p className="text-sm max-lg:text-[13px] max-md:text-[11px]">Mail:</p>
            <p className="text-sm mb-6 max-lg:mb-4 max-lg:text-[13px] max-md:text-[11px]">info@commentsfusion.com</p>
            <p className="text-sm max-lg:text-[13px] max-md:text-[11px]">Address:</p>
            <p className="text-sm max-lg:text-[13px] max-md:text-[11px]">NICAT, ALPHA-11, NASTP</p>
            <p className="text-sm max-lg:text-[13px] max-md:text-[11px]">Monday - Friday</p>
            <p className="text-sm max-lg:text-[13px] max-md:text-[11px]">8:00am - 5:00pm</p>
          </div>
          {/* Divider */}
          <div className=" w-px h-65 max-lg:h-57 bg-white/30  " />
          {/* Legals */}
          <div className="flex-1 mb-8 ">
            <h3 className="text-lg font-bold mb-4 max-lg:text-[16px] max-md:text-[14px]">Legals</h3>
            <ul className="space-y-6 max-lg:space-y-4  text-sm max-lg:text-[13px] max-md:text-[11px]">
              <li><a href="#" >Terms & Condition</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Return & Refund</a></li>
            </ul>
          </div>
          {/* Divider */}
          <div className=" w-px bg-white/30 h-65 max-lg:h-57" />
          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4 max-lg:text-[16px] max-md:text-[14px]">Quick Links</h3>
            <ul className="space-y-3  text-sm max-lg:text-[13px] max-md:text-[11px]">
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom Text */}
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center mt-20 max-lg:mt-15 max-md:mt-12 text-xs sm:text-sm text-white/60 px-2">
          <p>© 2025 Comments Fusion. All rights reserved.</p>
          <p>
            Design & Develop by <span className="text-white">Konquer Solution Pvt Ltd</span>

          </p>
           
        </div>
        {/* Divider */}
        <div className="hidden lg:block w-px bg-white/30 self-stretch" />
        {/* Contact Info */}
        <div className="flex-1 mb-8 lg:mb-0">
          <h3 className="text-lg font-bold mb-4">Contact information</h3>
          <p className="text-sm">Phone:</p>
          <p className="text-sm mb-6"> +923289603143</p>
          <p className="text-sm">Mail:</p>
          <p className="text-sm mb-6">info@commentsfusion.com</p>
          <p className="text-sm">Address:</p>
          <p className="text-sm">NICAT, ALPHA-11, NASTP</p>
          <p className="text-sm">Monday - Friday</p>
          <p className="text-sm">8:00am - 5:00pm</p>
        </div>
        {/* Divider */}
        <div className="hidden lg:block w-px bg-white/30 self-stretch" />
        {/* Legals */}
        <div className="flex-1 mb-8 lg:mb-0">
          <h3 className="text-lg font-bold mb-4">Legals</h3>
          <ul className="space-y-6 sm:space-y-10 text-sm">
            <li><a href="#" >Terms & Condition</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Return & Refund</a></li>
          </ul>
        </div>
        {/* Divider */}
        <div className="hidden lg:block w-px bg-white/30 self-stretch" />
        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-3 sm:space-y-5 text-sm">
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom Text */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 sm:mt-20 text-xs sm:text-sm text-white/60 px-2">
        <p>© 2025 Comments Fusion. All rights reserved.</p>
        <p className="mt-3 md:mt-0">
          Design & Develop by <span className="text-white">Konquer Solution Pvt Ltd</span>
        </p>
      </div>
    </footer>
  );
}
