Following is the record to changes implement in web.js

Timestamp : 12/11/2024 11:24PM
Change:
before:
    e.style.setProperty("background", t) 
after:
    e.style.setProperty("background", "#00FF00", "important")

Code snippet: (Line 50005)

                    b((o => {
                        var t = r.bubbleBackgroundColor
                          , a = r.bubbleTextColor
                          , l = r.isFullPage ? "0px" : "6px"
                          , i = r.isFullPage ? "0px" : "6px";
                        return t !== o._v$3 && (null != (o._v$3 = t) ? e.style.setProperty("background", "#00FF00", "important") : e.style.removeProperty("background")),
                        a !== o._v$4 && (null != (o._v$4 = a) ? e.style.setProperty("color", a) : e.style.removeProperty("color")),
                        l !== o._v$5 && (null != (o._v$5 = l) ? e.style.setProperty("border-top-left-radius", l) : e.style.removeProperty("border-top-left-radius")),
                        i !== o._v$6 && (null != (o._v$6 = i) ? e.style.setProperty("border-top-right-radius", i) : e.style.removeProperty("border-top-right-radius")),
                        o
                    }


Timestamp : 12/11/2024 11:53PM
Change:
before:
    (Ve() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl")
after:
    (Ve() ? "w-3 h-3 text-sm" : "w-6 h-6 text-xl")

Code snippet: (Line 1882)


        const e = Vr()
          , r = e.firstChild;
        return b((o => {
            var t = "flex justify-center items-center rounded-full text-white relative flex-shrink-0 " + (Ve() ? "w-3 h-3 text-sm" : "w-6 h-6 text-xl")
              , a = "absolute top-0 left-0 " + (Ve() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
            return t !== o._v$ && ie(e, o._v$ = t),
            a !== o._v$2 && le(r, "class", o._v$2 = a),
            o

Code snippet: (Line 1912)
        },
        get children() {
            const e = Hr()
              , o = e.firstChild;
            return b((t => {
                var a = "flex justify-center items-center rounded-full text-white relative flex-shrink-0 " + (Ve() ? "w-3 h-3 text-sm" : "w-6 h-6 text-xl")
                  , l = r();
                return a !== t._v$ && ie(e, t._v$ = a),
                l !== t._v$2 && le(o, "src", t._v$2 = l),
                t
            }