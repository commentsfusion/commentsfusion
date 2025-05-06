export default function Footer() {
    return (
      <footer className="text-white py-20 px-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
  
    
                  <div className="flex-1">
                    <img 
                      src="/images/logo/logo.svg" 
                      alt="Comment's Fusion Logo" 
                      className="w-90 mb-1" 
                    />
                    <p className="text-small ml-10">Comments with solution</p>
                    <p className="mt-8 text-sm  text-white/90">
                      Stay ahead with AI-powered commenting!
                    </p>
                    <p className="text-sm text-white/70 mt-1 leading-relaxed">
                      Transform your social interactions with smart, personalized, and engaging responses that drive meaningful conversations.
                    </p>
                  </div>
          
                  {/* Divider */}
          <div className="hidden lg:block w-px bg-white/30 self-stretch" />
  
          {/* Contact Info */}
          <div className="flex-1">
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
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Legals</h3>
            <ul className="space-y-10 text-sm">
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
            <ul className="space-y-5 text-sm">
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Text */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-20 text-sm text-white/60 px-2">
          <p>© 2025 Comments Fusion. All rights reserved.</p>
          <p className="mt-3 md:mt-0">
            Design & Develop by <span className="text-white">Konquer Solution Pvt Ltd</span>
          </p>
        </div>
      </footer>
    );
  }
  