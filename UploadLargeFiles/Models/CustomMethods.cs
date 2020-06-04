using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCAMBIOFILE.PASSADOC.Models
{
    public class CustomMethods
    {
		public static string LoadScript(string url)
		{
			string strFilePath = null;
			strFilePath = HttpContext.Current.Server.MapPath(url);
			DateTime dtLastModified = System.IO.File.GetLastWriteTime(strFilePath);
			string s = string.Format("\n<script language='javaScript' type='text/javascript' src='{0}?v={1}'></script>", url, dtLastModified.ToString("yyyyMMddhhmmss"));
			return s;
		}

		public static string LoadCSS(string url)
		{
			string strFilePath = null;
			strFilePath = HttpContext.Current.Server.MapPath(url);
			DateTime dtLastModified = System.IO.File.GetLastWriteTime(strFilePath);
			string s = string.Format("\n<link href='{0}?v={1}' rel='stylesheet'></script>", url, dtLastModified.ToString("yyyyMMddhhmmss"));
			return s;
		}
	}
}